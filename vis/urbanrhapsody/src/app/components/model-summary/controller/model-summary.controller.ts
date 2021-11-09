import { ChartUtils } from "src/app/utils/chart/chart.utils";

// third-party
import * as d3 from 'd3';

export class ModelSummaryController {

    // chart container
    public chartContainer!: HTMLElement;

    // constants
    public pad: number = 2;

    // scales
    // public xScale!: d3.ScaleSequential<number, number>;
    public xScale!: any;
    public yScale!: any; //d3.ScaleSequential<any, any>;

    // axes
    public xAxis!: d3.Axis<Number>;

    // axes groups
    public xAxisGroup!: d3.Selection<any,any,any,any>;
    public yAxisGroup!: d3.Selection<any,any,any,any>;

    // svg
    public svg!: d3.Selection<any,any,any,any>;
    public group!: d3.Selection<any,any,any,any>;

    // margins
    public margins: { top: number, bottom: number, left: number, right: number } = { top: 30, bottom: 30, left: 30, right: 30 };


    constructor(){}

    public initialize_controller( container: HTMLElement ): void {

        // saving container 
        this.chartContainer = container;

        // initializing chart
        this.initialize_chart();

    }

    public initialize_chart(): void {

        // creating svg and group
        this.svg = ChartUtils.create_svg( this.chartContainer );
        this.group = ChartUtils.create_group( this.svg, this.margins );

        // axes groups
        this.xAxisGroup = ChartUtils.create_group( this.svg, { top: this.chartContainer.clientHeight - this.margins.bottom, bottom: 0, left: this.margins.left, right: 0 });
        this.yAxisGroup = ChartUtils.create_group( this.svg, { top: this.margins.top, bottom: 0, left: this.margins.left, right: 0 } )

    }


    public update_chart( accuracy: number[] ): void {

        // update scales
        this.update_scales( accuracy );

        // updating axes
        this.update_axes();

        const line = d3.line<number>()
            .curve(d3.curveCatmullRom)
            .x( (currentAccuracy: number, index: number) => this.xScale(index) )
            .y( (currentAccuracy: number, index: number) => this.yScale(currentAccuracy) )

        this.group
            .append("path")
            .datum( accuracy ) 
            .attr("class", "line") 
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr("d", line);
            

        this.group
            .selectAll('.summary-instance')
            .data( accuracy )
            .join(
                enter => 
                    enter
                    .append('circle')
                    .attr( 'cx', (currentAccuracy: number, index: number) => this.xScale(index) )
                    .attr( 'cy', (currentAccuracy: number, index: number) => this.yScale(currentAccuracy) )
                    .attr( 'r', 5 )
                    .attr('class', 'summary-instance')
                    .attr('fill', '#9D9D9D' ),
                update => 
                    update
                        .attr( 'cx', (currentAccuracy: number, index: number) => this.xScale(index) )
                        .attr( 'cy', (currentAccuracy: number, index: number) => this.yScale(currentAccuracy) ),
            exit => 
                exit.remove()
        );

    }



    public update_axes(): void {

        this.xAxisGroup.call( d3.axisBottom(this.xScale));
        this.yAxisGroup.call( d3.axisLeft(this.yScale));

    }
    
    public update_scales( accuracy: number[] ): void {

        this.xScale = ChartUtils.create_sequential_scale( [0, accuracy.length ], [ 0, this.chartContainer.clientWidth - this.margins.right - this.margins.left] )
        this.yScale = ChartUtils.create_sequential_scale( [0, 1], [ this.chartContainer.clientHeight - this.margins.top - this.margins.bottom, 0] )
        
    }

}