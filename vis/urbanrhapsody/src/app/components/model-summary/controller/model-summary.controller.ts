import { ChartUtils } from "src/app/utils/chart/chart.utils";

// third-party
import * as d3 from 'd3';
import { PrototypeSummary } from "src/app/model/prototypesummary.model";

export class ModelSummaryController {

    // chart container
    public chartContainer!: HTMLElement;

    // constants
    public pad: number = 2;

    // scales
    // public xScale!: d3.ScaleSequential<number, number>;
    public xScale!: any;
    public yScale!: any; //d3.ScaleSequential<any, any>;
    public colorScale!: any;

    // axes
    public xAxis!: d3.Axis<Number>;

    // axes groups
    public xAxisGroup!: d3.Selection<any,any,any,any>;
    public yAxisGroup!: d3.Selection<any,any,any,any>;

    // svg
    public svg!: d3.Selection<any,any,any,any>;
    public group!: d3.Selection<any,any,any,any>;

    // line generator
    public line!: d3.Line<any>;

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

        // line generator
        this.line = this.create_line_generator();
    }


    public update_chart( modelSummary: PrototypeSummary ): void {

        // update scales
        this.update_scales( modelSummary );

        // // updating axes
        this.update_axes();


        const linegroups = this.group
            .selectAll('.line-group')
            .data( modelSummary.accuracies )
            .join(
                (enter: any) => enter
                    .append('g')
                    .attr('class', 'line-group')
                    .attr('fill', (accuracies: number[], modelindex: number) => this.colorScale(modelindex) )  
        );

        linegroups
            .selectAll('.model-accuracy')
            .data( ( timeaccuracy: number[], index: number ) => { 
                const slicedAccuracies: number[] = timeaccuracy.slice(index, timeaccuracy.length);
                const timeNormalizedAccuracies: any = slicedAccuracies.map( (accuracy: number, currentIndex: number) => {  return {accuracy: accuracy, index: index + currentIndex } } );
                return timeNormalizedAccuracies;
            }) 
            .join(
                (enter: any) => enter
                    .append('circle')
                    .attr('cx', (accuracy: any, index: number) => this.xScale(accuracy.index) )
                    .attr('cy', (accuracy: any, index: number) => this.yScale(accuracy.accuracy) )
                    .attr('r', 5),
                (update: any) => update
                    .attr('cx', (accuracy: any, index: number) => this.xScale(accuracy.index) )
                    .attr('cy', (accuracy: any, index: number) => this.yScale(accuracy.accuracy) )
                    .attr('r', 5)
            )

        linegroups
            .append("path")
            .datum( ( timeaccuracy: number[], index: number ) => { 
                const slicedAccuracies: number[] = timeaccuracy.slice(index, timeaccuracy.length);
                const timeNormalizedAccuracies: any = slicedAccuracies.map( (accuracy: number, currentIndex: number) => {  return { accuracy: accuracy, index: index + currentIndex } } );
                return timeNormalizedAccuracies;
            }) 
            .attr("class", "line") 
            .attr('fill', 'none' )
            .attr('stroke', ( data: any, modelIndex: any ) => this.colorScale(modelIndex) )
            .attr("stroke-width", 1)
            .attr('opacity', 0.5)
            .on('mouseover', function(d) { 
                d3.select(this)
                    .attr('opacity', 1)
                    .attr("stroke-width", 5)
            })
            .on('mouseout', function(d) { 
                d3.select(this)
                    .attr('opacity', 0.5)
                    .attr("stroke-width", 1)
            })
            .attr("d", this.line)
            .attr('cursor', 'pointer');

    }

    public create_line_generator(): d3.Line<any> {

        return d3.line<any>()
        .curve(d3.curveCatmullRom)
        .x( (currentAccuracy: {accuracy: number, index: number }, index: number) => this.xScale(currentAccuracy.index) )
        .y( (currentAccuracy: {accuracy: number, index: number }, index: number) => this.yScale(currentAccuracy.accuracy) );

    }

    public update_axes(): void {

        this.xAxisGroup.call( d3.axisBottom(this.xScale));
        this.yAxisGroup.call( d3.axisLeft(this.yScale));

    }
    
    public update_scales( modelSummary: PrototypeSummary ): void {

        this.xScale = ChartUtils.create_sequential_scale( [0, modelSummary.get_number_of_refinements() ], [ 0, this.chartContainer.clientWidth - this.margins.right - this.margins.left] );
        this.yScale = ChartUtils.create_sequential_scale( [0.5, 1], [ this.chartContainer.clientHeight - this.margins.top - this.margins.bottom, 0] );
        this.colorScale = ChartUtils.create_sequential_color_scale( [0, modelSummary.get_number_of_refinements()], [ '#8c96c6', '#4d004b' ] );
    }

}