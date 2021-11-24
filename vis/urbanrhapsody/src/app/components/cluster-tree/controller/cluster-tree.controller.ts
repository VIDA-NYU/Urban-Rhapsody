import { ChartUtils } from "src/app/utils/chart/chart.utils";
import * as d3hieararchy from 'd3-hierarchy'
import * as d3 from 'd3';
import { EventEmitter } from "@angular/core";
import * as _ from "lodash";
import { DataState } from "src/app/state/data.state";
import { AudioFrame } from "src/app/model/audioframe.model";

export class ClusterTreeController {

    // data state
    public dataState!: DataState;

    // events
    public events: { [event: string]: EventEmitter<any> } = {};

    // chart container
    public container!: HTMLElement;

    // svg
    public svg!: d3.Selection<any,any,any,any>;
    public group!: d3.Selection<any,any,any,any>;

    // scales
    public depthScale!: any;

    // tree layout
    public treeLayout!: any;

    // margins
    public margins: { top: number, bottom: number, left: number, right: number } = { top: 30, bottom: 30, left: 30, right: 30 };

    constructor(){}

    public initialize_controller( container: HTMLElement, events: { [event: string]: EventEmitter<any> }, dataState: DataState ): void {

        // saving events
        this.events = events;

        // saving refs
        this.container = container;
        this.dataState = dataState;

        // initializing chart
        this.initialize_chart( container );

    }

    public initialize_chart( container: HTMLElement ): void {

        // creating svg and group
        this.svg = ChartUtils.create_svg( container );
        this.group = ChartUtils.create_group( this.svg, this.margins );

        // creating tree layout
        this.treeLayout = this.create_tree_layout();

    }

    private create_tree_layout(){

        const targetWidth = this.container.clientWidth - this.margins.left - this.margins.right;
        const targetHeight = this.container.clientHeight - this.margins.bottom - this.margins.top;

        return d3hieararchy.tree().size([targetHeight, targetWidth]);

    }

    public update_tree( tree: any, prototypes: any[] ){

        if(prototypes.length === 0) return;

        // creating tree layout
        const rootLayout = d3.hierarchy(tree);
        this.treeLayout(rootLayout);

        // this.group.selectAll('.link').remove();
        // this.group.selectAll('.node').remove();

        console.log('tree: ', tree);

        const linkfunc = d3.linkVertical()
            .x(function(d: any) { return d.x; })
            .y(function(d: any) { return d.y; });

        const likelihoods: number[][] = this.get_average_prototype_likelihood( rootLayout.descendants(), prototypes );

        // links enter
        this.group
            .selectAll('line.link')
            .data(rootLayout.links())
            .enter()
            .append('line')
            .classed('link', true)
            .attr('x1', (d: any)=> d.source['y'] )
            .attr('y1', (d: any) => d.source['x'] )
            .attr('x2', (d: any) => d.source['y'] )
            .attr('y2', (d: any) => d.source['x'] )
            .transition().duration(1000).delay(0)
            .attr('x2', (d: any) => d.target['y']  )
            .attr('y2', (d: any) => d.target['x'] )
            .attr('stroke', '#555555')
            .attr('stroke-width', 3);



        // nodes enter
        const distributiongroups = this.group
            .selectAll('.group-node')
            .data(rootLayout.descendants())
            .join(
                (enter: any) => enter
                    .append('g')
                    .attr('class', 'group-node')
                    .attr('transform', (d: any) =>  'translate(' + (d['y'] -  25)  + ',' + (d['x'] - 10) + ')' )
                    .style('cursor', 'pointer')
                    .on('click', (event: any, a: any, c: any) => { 
                        const indices: string [] = this.get_all_children_frames(a);
                        this.events['clusternodeselected'].emit({'uids': indices});
                    })
            )
                
        
        
        const distributionScale: any = ChartUtils.create_sequential_scale([0, likelihoods[0].length], [0, 50])
        const colorScale: any = ChartUtils.create_sequential_color_scale([0, 1], d3.interpolateGreens);
                
        // width of each subrect
        const rectWidth: number = 50/prototypes.length;

        distributiongroups
            .selectAll('.distribution-node')
            .data( (test: any, a: any) => {  return likelihoods[a]; } )
            .join(
                (enter: any) => enter
                    .append('rect')
                    .attr('x', (d: any, a: any)  => distributionScale(a)  )
                    .attr('y', (d: any)  => 0 )
                    .attr('width', rectWidth)
                    .attr('height', 20)
                    .attr('fill',(d: any, a: any)  => colorScale(d) )
                    .style('stroke', '#555555')
                    .style('stroke-width', 3)
                    .style('stroke-radius', '3px'),
                (update: any) => update
                    .attr('x', (d: any, a: any)  => distributionScale(a) )
                    .attr('y', (d: any)  => 0 )
                    .attr('fill',(d: any, a: any)  => colorScale(d) ),
            )  

    }

    private get_average_prototype_likelihood( nodes: any, prototypes: any[] ): number[][]{

        const likelihoods: number[][] = [];
        _.forEach( nodes, (node: any) => {
            const currentPrototypeDist: number[] = [];
            _.forEach( prototypes, prototype => {
                currentPrototypeDist.push(this.get_node_prediction_probability(node, prototype))
            })
            likelihoods.push(currentPrototypeDist);
        })
       
        return likelihoods;
    }


    private get_node_prediction_probability( node: any, prototype: string ): number {

        // getting all frames under that node
        const nodeFrames: string[] = this.get_all_children_frames(node);

        let probAccumulator: number = 0;
        _.forEach( nodeFrames, frameID => {

            const currentFrame: AudioFrame = this.dataState.indexedFrames[frameID];
            const currentPrototypePrediction: number = currentFrame.metadata.get_prototype_prediction(prototype);
            probAccumulator += currentPrototypePrediction;

        });

        return probAccumulator / nodeFrames.length;

    }

    private get_all_children_frames( node: any ): string[] {

        if( !(node.children) ){

            const indices: string[] = node.data.indices;
            return indices
        }

        const leftIndices: string [] = this.get_all_children_frames(node.children[0]);
        const rightIndices: string[] = this.get_all_children_frames(node.children[1]);

        return leftIndices.concat(rightIndices)
    }

}