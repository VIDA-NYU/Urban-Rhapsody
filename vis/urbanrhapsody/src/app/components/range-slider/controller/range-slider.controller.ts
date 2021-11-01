import { ChartUtils } from "src/app/utils/chart/chart.utils";

// third-party
import * as d3 from 'd3';
import { EventEmitter } from "@angular/core";

export class RangeSliderController {

    // events
    public events: { [eventname: string]: EventEmitter<any> } = {};

    // chart title
    public sliderTitle: string = '';

    // container
    public container!: HTMLElement;

    // svg selection
    public svg!: d3.Selection<any,any,any,any>;
    public group!: d3.Selection<any,any,any,any>;
    public margins: { top: number, bottom: number, left: number, right: number } = { top: 10, bottom: 10, left: 10, right: 10 };

    // scales
    public xScale!: d3.ScaleLinear<any, any>;

    // data domain
    public attributeDomain: number[] = [];

    // brush
    public brush !: any;
    public currentBrushEvent!: any;

    constructor(){}

    public initialize_controller( container: HTMLElement, attributeDomain: number[], events: { [eventname: string]: EventEmitter<any> }, sliderTitle: string ): void {

        // saving container
        this.container = container;

        // saving title
        this.sliderTitle = sliderTitle;

        // attribute domain
        this.attributeDomain = attributeDomain;

        // saving events
        this.events = events;

        // initializing chart
        this.initialize_chart();

    }

    public initialize_chart(): void {

        this.svg = ChartUtils.create_svg( this.container );
        this.group = ChartUtils.create_group( this.svg, this.margins );

        // updating scales
        this.update_scales();

        this.render_chart();

        // creating brush
        this.update_brush();

    }

    public update_brush(): void {

        // updating brush
        this.brush = ChartUtils.create_brush( this.group, this.margins, this.container );
        this.brush.on('end', (brushEvent: any) => this.brushed(brushEvent) );

    }

    public brushed( brushEvent: any ): void {

        this.currentBrushEvent = [ this.xScale.invert(brushEvent.selection[0]), this.xScale.invert(brushEvent.selection[1]) ];
        this.render_chart();

        // emiting
        this.events['onrangeselected'].emit( {title: this.sliderTitle, selection: this.currentBrushEvent } );

    }

    public update_scales(): void {

        this.xScale = ChartUtils.create_linear_scale( d3.extent(this.attributeDomain), [0, this.container.clientWidth - this.margins.left - this.margins.right ] );
    
    }


    public brush_color_picker( attributeValue: number ): string {

        if( attributeValue >= this.currentBrushEvent[0] && attributeValue <= this.currentBrushEvent[1] ){
            return '#30414b';
        }
        return '#b1c5cb';

    }

    public render_chart(): void {

        // bar width
        const barWidth: number = this.xScale(1) - this.xScale(0);
        const barHeight: number = this.container.clientHeight - this.margins.top - this.margins.bottom;

        this.group
        .selectAll('.domain-bar')
        .data( this.attributeDomain )
        .join(
            enter => 
                enter
                .append('rect')
                .attr('x', (attributeValue: number, index: number) => this.xScale(index) - 1 )
                .attr('y', 0 )
                .attr('width', barWidth - 2)
                .attr('height', barHeight )
                .attr('class', 'domain-bar')
                .attr('fill', '#b1c5cb' ),
            update => update
                    .attr('fill', (attributeValue: number, index: number) => this.brush_color_picker(attributeValue) ),
            exit => 
                exit.remove()
        );
    }

}