import { ChartUtils } from "src/app/utils/chart/chart.utils";
import * as d3hieararchy from 'd3-hierarchy'
import * as d3 from 'd3';
import { EventEmitter } from "@angular/core";

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

        // setting loading flag
        // this.isLoading = false;

        // creating tree layout
        const rootLayout = d3.hierarchy(tree);
        this.treeLayout(rootLayout);

        this.group.selectAll('.link').remove();
        this.group.selectAll('.node').remove();

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
        this.group
            .selectAll('circle.node')
            .data(rootLayout.descendants())
            .enter()
            .append('circle')
            .classed('node', true)
            .on('click', (event, data) => {
                
                // preventing defaulg
                event.preventDefault();

                const indices: string [] = this.get_all_children_frames(data);
                this.events['clusternodeselected'].emit({'uids': indices})
                // this.sample_uids(indices);

            })
            .attr('cx', (d: any)  => d['x'] )
            .attr('cy', (d: any)  => d['y'] )
            .attr('r', 6)
            .attr('fill', '#ecd16f')
            .style('cursor', 'pointer');

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