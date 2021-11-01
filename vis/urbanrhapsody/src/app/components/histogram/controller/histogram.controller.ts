import { ChartUtils } from "src/app/utils/chart/chart.utils";
import * as d3 from 'd3';

export class HistogramController {  

    // chart title
    public chartTitle!: string;

    // brush group
    public brush!: any;
    
    // chart container
    public chartContainer!: HTMLElement;
    public xAxisGroup!: d3.Selection<any,any,any,any>;

    // constants
    public pad: number = 2;

    // scales
    // public xScale!: d3.ScaleSequential<number, number>;
    public xScale!: any;
    public yScale!: any; //d3.ScaleSequential<any, any>;

    // axes
    public xAxis!: d3.Axis<Number>;

    // svg
    public svg!: d3.Selection<any,any,any,any>;
    public group!: d3.Selection<any,any,any,any>;

    // margins
    public margins: { top: number, bottom: number, left: number, right: number } = { top: 30, bottom: 30, left: 30, right: 30 };

    constructor(){}

    public initialize_controller( 
        chartContainer: HTMLElement, 
        chartTitle: string ): void {

        // saving chart title
        this.chartTitle = chartTitle;

        // saving chart container ref
        this.chartContainer = chartContainer;

        // initializing chart
        this.initialize_chart();

    }

    public initialize_chart(): void {

        // creating svg
        this.svg = ChartUtils.create_svg( this.chartContainer );
        this.group = ChartUtils.create_group( this.svg, this.margins );
        this.xAxisGroup = ChartUtils.create_group( this.svg, { top: this.chartContainer.clientHeight - this.margins.bottom, bottom: 0, left: this.margins.left, right: 0 } );

    }

    // TODO: Remove it
    public brushed( brushEvent: any ): void {
        
        const values: number[] = [this.xScale.invert(brushEvent.selection[0]), this.xScale.invert(brushEvent.selection[1])];

    }

    public update_axes( barWidth: number ): void {

        this.xAxisGroup
            .call( d3.axisBottom(this.xScale).tickSize(0).ticks(8) )
            .selectAll("text")
            .attr('transform', 'translate(' + ( barWidth/2 ) + ',' + 3 + ')')
    }

    public render_chart( histogramData: number[] ):  void {

        // set transitions
        const t = this.svg.transition().duration(750);
        
        // updating axes
        this.xScale = ChartUtils.create_linear_scale( [0, histogramData.length], [0, this.chartContainer.clientWidth - this.margins.left - this.margins.right ] );
        this.yScale = ChartUtils.create_linear_scale( [0, d3.max(histogramData) ], [ 0, this.chartContainer.clientHeight - this.margins.top - this.margins.bottom ] );

        if(this.yScale.domain()[1] === 0) {this.group.selectAll('.hour-bar').remove(); return;} 

        // bar width
        const barWidth: number = this.xScale(1) - this.xScale(0);
        const baseHeight: number = this.chartContainer.clientHeight - this.margins.top - this.margins.bottom;

        // updating axes
        this.update_axes(barWidth);
        

        // D3 NEW WAY OF DOING ENTER UPDATE EXIT
        this.group
        .selectAll('.hour-bar')
        .data( histogramData )
        .join(
            enter => 
                enter
                .append('rect')
                .attr('x', (occurrences: number, index: number) => this.xScale(index) + this.pad/2   )
                .attr('y', (occurrences: number, index: number) =>  baseHeight - this.yScale(occurrences) )
                .attr('width', barWidth - this.pad )
                .attr('height', (occurrences: number, index: number) => this.yScale(occurrences ) )
                .attr('class', 'hour-bar')
                .attr('fill', '#1F3F49' ),
            update => 
                update.transition(t)
                    .attr('x', (occurrences: number, index: number) => this.xScale(index) + this.pad/2   )
                    .attr('y', (occurrences: number, index: number) =>  baseHeight - this.yScale(occurrences) )
                    .attr('width', barWidth - this.pad )
                    .attr('height', (occurrences: number, index: number) => this.yScale(occurrences ) ),
            exit => 
                exit.remove()
        );

        

    }

}