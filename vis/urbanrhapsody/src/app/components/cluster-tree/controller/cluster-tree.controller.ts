import { ChartUtils } from "src/app/utils/chart/chart.utils";
import * as d3hieararchy from 'd3-hierarchy'
import * as d3 from 'd3';
import { EventEmitter } from "@angular/core";
import * as _ from "lodash";

export class ClusterTreeController {

    // events
    public events: { [event: string]: EventEmitter<any> } = {};

    // chart container
    public container!: HTMLElement;

    // svg
    public svg!: d3.Selection<any,any,any,any>;
    public group!: d3.Selection<any,any,any,any>;

    // tree layout
    public treeLayout!: any;

    // margins
    public margins: { top: number, bottom: number, left: number, right: number } = { top: 30, bottom: 30, left: 30, right: 30 };

    constructor(){}

    public initialize_controller( container: HTMLElement, events: { [event: string]: EventEmitter<any> } ): void {

        // saving events
        this.events = events;

        // saving refs
        this.container = container;

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

        return d3hieararchy.tree().size([targetWidth,targetHeight]);

    }

    public update_tree( tree: any ){

        // creating tree layout
        const rootLayout = d3.hierarchy(tree);
        this.treeLayout(rootLayout);

        // this.group.selectAll('.link').remove();
        // this.group.selectAll('.node').remove();

        const likelihoods: number[][] = this.get_average_prototype_likelihood( rootLayout.descendants() );

        // links enter
        this.group
            .selectAll('line.link')
            .data(rootLayout.links())
            .enter()
            .append('line')
            .classed('link', true)
            .attr('x1', (d: any)=> d.source['x'] )
            .attr('y1', (d: any) => d.source['y'] + 6 )
            .attr('x2', (d: any) => d.source['x'] )
            .attr('y2', (d: any) => d.source['y'] )
            .transition().duration(1000).delay(0)
            .attr('x2', (d: any) => d.target['x'] )
            .attr('y2', (d: any) => d.target['y'] )
            .attr('stroke', '#272449')
            .attr('stroke-width', 2);


        // nodes enter
        const distributiongroups = this.group
            .selectAll('.group-node')
            .data(rootLayout.descendants())
            .join(
                (enter: any) => enter
                    .append('g')
                    .attr('class', 'group-node')
                    .attr('transform', (d: any) =>  'translate(' + (d['x'] - 5)  + ',' + d['y'] + ')' )
                    .style('cursor', 'pointer')
                    .on('click', (event: any, a: any, c: any) => { 
                        const indices: string [] = this.get_all_children_frames(a);
                        this.events['clusternodeselected'].emit({'uids': indices});
                    })
            )

        
        const distributionScale: any = ChartUtils.create_sequential_scale([0, likelihoods[0].length-1], [0, 5])
        const colorScale: any = ChartUtils.create_sequential_color_scale([0, 1]);

        distributiongroups
            .selectAll('.distribution-node')
            .data( (test: any, a: any) => {  return likelihoods[a]; } )
            .join(
                (enter: any) => enter
                    .append('rect')
                    .attr('x', (d: any, a: any)  => distributionScale(a) )
                    .attr('y', (d: any)  => 0 )
                    .attr('width', 5)
                    .attr('height', 10)
                    .attr('fill',(d: any, a: any)  => colorScale(d) ),
                (update: any) => update
                    .attr('x', (d: any, a: any)  => distributionScale(a) )
                    .attr('y', (d: any)  => 0 )
                    .attr('fill',(d: any, a: any)  => colorScale(d) ),
            )

       


        // distributiongroups
        //         .selectAll('.distribution-node')
        //         // .data( (test: any) => { console.log(test); console.log('--------'); return test} )
        //         .data( array  )
        //         .join(
        //             (enter: any) => enter
        //                 .append('circle')
        //                 .attr('cx', (d: any, a: any)  => { console.log(d); console.log(a); return d['x']} )
        //                 .attr('cy', (d: any)  => d['y'] )
        //                 .attr('r', 6)
        //         )

            // .enter()
            // .append('circle')
            // .classed('circle.node', true)
            // .on('click', (event, data) => {
                
            //     // preventing defaulg
            //     event.preventDefault();

            //     const indices: string [] = this.get_all_children_frames(data);
            //     this.events['clusternodeselected'].emit({'uids': indices})

            // })
            // .attr('cx', (d: any, a: any)  => { console.log(d); console.log(a); return d['x']} )
            // .attr('cy', (d: any)  => d['y'] )
            // .attr('r', 6)
            // .attr('fill', '#ecd16f')
            // .style('cursor', 'pointer');
        
        // // nodes enter
        // this.group
        //     .selectAll('.circle.node')
        //     .data(rootLayout.descendants())
        //     .enter()
        //     .append('circle')
        //     .classed('circle.node', true)
        //     .on('click', (event, data) => {
                
        //         // preventing defaulg
        //         event.preventDefault();

        //         const indices: string [] = this.get_all_children_frames(data);
        //         this.events['clusternodeselected'].emit({'uids': indices})

        //     })
        //     .attr('cx', (d: any, a: any)  => { console.log(d); console.log(a); return d['x']} )
        //     .attr('cy', (d: any)  => d['y'] )
        //     .attr('r', 6)
        //     .attr('fill', '#ecd16f')
        //     .style('cursor', 'pointer');

        // nodes enter
        // this.group
        //     .selectAll('circle.node')
        //     .data(rootLayout.descendants())
        //     .enter()
        //     .append('rect')
        //     .classed('node', true)
        //     .on('click', (event: any, data: any) => {
                
        //         // preventing defaulg
        //         event.preventDefault();

        //         const indices: string [] = this.get_all_children_frames(data);
                
        //         // firing event
        //         // this.onclusterselected.emit({ 'uids': indices });

        //         // this.sample_uids(indices);

        //     })
        //     .attr('x', (d: any)  => d['x'] - 12 )
        //     .attr('y', (d: any)  => d['y'] -2 )
        //     .attr('width', 24)
        //     .attr('height', 19 )
        //     .attr('fill', 'black' )
        //     .style('cursor', 'pointer');

        // // nodes enter
        // this.group
        //     .selectAll('circle.node')
        //     .data(rootLayout.descendants())
        //     .enter()
        //     .append('rect')
        //     .classed('node', true)
        //     .on('click', (event: any, data: any) => {
                
        //         // preventing defaulg
        //         event.preventDefault();

        //         const indices: string [] = this.get_all_children_frames(data);
                
        //         // firing event
        //         // this.onclusterselected.emit({ 'uids': indices });

        //         // this.sample_uids(indices);

        //     })
        //     .attr('x', (d: any)  => d['x'] - 10 )
        //     .attr('y', (d: any)  => d['y'] )
        //     .attr('width', 10)
        //     .attr('height', 15)
        //     // .attr('fill', (d, i) => this.color_node(d, 4) )
        //     .style('cursor', 'pointer');
        //     // .style('stroke' , 'black')
        //     // .style('stroke-width', '2px');

        // this.group
        //     .selectAll('circle.node')
        //     .data(rootLayout.descendants())
        //     .enter()
        //     .append('rect')
        //     .classed('node', true)
        //     .on('click', (event: any, data: any) => {
                
        //         // preventing defaulg
        //         event.preventDefault();

        //         const indices: string [] = this.get_all_children_frames(data);
                
        //         // firing event
        //         // this.onclusterselected.emit({ 'uids': indices });

        //         // this.sample_uids(indices);

        //     })
        //     .attr('x', (d: any)  => d['x'] )
        //     .attr('y', (d: any)  => d['y'] )
        //     .attr('width', 10)
        //     .attr('height', 15)
        //     // .attr('fill', (d, i) => this.color_node(d, 4) )
        //     .style('cursor', 'pointer');
        //     // .style('stroke' , 'black')
        //     // .style('stroke-width', '2px');

        

    }

    private get_average_prototype_likelihood( nodes: any ): number[][]{

        const likelihoods: number[][] = [];
        _.forEach( nodes, (node: any) => {

            likelihoods.push([Math.random(), Math.random()])
        })
       
        return likelihoods;
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