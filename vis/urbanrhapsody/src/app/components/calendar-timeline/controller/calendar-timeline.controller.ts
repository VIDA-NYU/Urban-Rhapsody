import * as d3 from 'd3';
import { ChartUtils } from 'src/app/utils/chart/chart.utils';
import { MiscUtils } from 'src/app/utils/misc/misc.utils';
import { WEEKDAYS, MONTHS } from '../../../utils/constants/constants';

export class CalendarTimelineController {

    // scales
    public xScale!: d3.ScaleSequential<any, any>;
    public yScale!: d3.ScaleBand<any>;
    public colorScale!: d3.ScaleSequential<any, any>;
    public monthScale!: d3.ScaleBand<any>;

    public svg!: any;
    public chartgroup!: d3.Selection<any, any, any, any>;

    // axis
    public yAxisGroup!: any;
    public xAxisGroup!: any;

    // margins
    public margins: { top: number, right: number, bottom: number, left: number } = { top: 50, right: 100, bottom: 50, left: 100 };

    // events
    public events: any = {};

    constructor(){}

    public generate_base_dataset( yearAudioDistribution: { [ datetime: string ]: number } ) {

        // year distribution dates
        const yearDistribution: { date: Date, amount: number, week: number }[] = [];

        let currentDate: Date = new Date(Date.parse('2017-01-02'));
        const startDate: Date = new Date(Date.parse('2017-01-02'));

        while(currentDate.getFullYear() === 2017){

            const weekNumber: Date[] = d3.timeWeeks(startDate, currentDate)

            // Improve it
            let currentAmount: number = 0;
            const datestr: string = `${currentDate.getFullYear()}-${ ('0' + currentDate.getMonth()).slice(-2) }-${ ('0' + currentDate.getDate()).slice(-2) }`
            if( datestr in yearAudioDistribution ) {
                currentAmount = yearAudioDistribution[datestr];
            }

            yearDistribution.push( { date: currentDate, amount: currentAmount, week: weekNumber.length } );

            // incrementing date
            currentDate.setDate( currentDate.getDate() + 1);
            currentDate = new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() );

        }  

        return yearDistribution;
    }

    public initialize_chart( container: HTMLElement, events: {} ): void{

        /**
         * Saving external events
         */
        
        this.events = events;

        /**
         * Basic components of a chart
         */
        if( !this.svg ) this.svg = ChartUtils.create_svg( container );
        if( !this.chartgroup ) this.chartgroup = ChartUtils.create_group( this.svg, this.margins );

        /**
         * Creates a scale that begins in the first week of the year and goes until last week of the year   
         * The maxinum number of weeks in a year is 52
         */

        const width: number = container.offsetWidth;
        const height: number = container.offsetHeight;

        if( !this.xScale ) this.xScale = ChartUtils.create_sequential_scale( [0, 53], [0, width - this.margins.left - this.margins.right] );
        if( !this.yScale ) this.yScale = ChartUtils.create_band_scale( WEEKDAYS, [0, height - this.margins.top - this.margins.bottom] );
        if( !this.colorScale ) this.colorScale = ChartUtils.create_color_scale( [0, 10] );
        if( !this.monthScale ) this.monthScale = ChartUtils.create_band_scale( MONTHS, [0, width - this.margins.left - this.margins.right] );

        this.update_x_axis();
        this.update_y_axis();
    }

    private update_x_axis(): void{

        this.xAxisGroup = this.svg
            .append('g')
            .style('font-size', 15)
            .style('font-weight', 900)
            .style('color', '#8c8f94')
            .attr('transform', 'translate(' + (this.margins.left) + ',' + (this.margins.top - 5 ) + ')')
            .call(d3.axisTop(this.monthScale).tickSize(0))
            .select(".domain").remove();


    }

    private update_y_axis(): void{

        this.yAxisGroup = this.svg
            .append('g')
            .style('font-size', 15)
            .style('font-weight', 900)
            .style('color', '#8c8f94')
            .attr('transform', 'translate(' + (this.margins.left - 5) + ',' + this.margins.top + ')')
            .call(d3.axisLeft(this.yScale).tickSize(0))
            .select(".domain").remove();

    }

    private cell_click_handler( currentDate: { date: Date, amount: number, week: number } ): void {
        this.events['oncellclick'].emit({ day: MiscUtils.format_US_datetime( currentDate.date ) })
    }

    public render_chart( dataset: any ): void {

        // cell dimensions
        const cellWidth: number = this.xScale(1) - this.xScale(0);
        const cellHeight: number = this.yScale.bandwidth();
        const cellGap: number = 5;

        this.chartgroup
            .selectAll('day-cell')
            .data( dataset )
            .join(
                (enter: any) => enter
                    .append('rect')
                    .attr('class', 'day-cell')
                    .attr('x', (d: any) => this.xScale(d.week) - cellGap/2 )
                    .attr('y', (d: any) =>  this.yScale(WEEKDAYS[d.date.getDay()]) )
                    .attr('rx', 3)
                    .attr('ry', 3)
                    .attr('width', cellWidth - cellGap)
                    .attr('height', cellHeight - cellGap )
                    .attr('fill', (d: any) => this.colorScale(d.amount) )
                    .style('stroke', '#dcdcde')
                    .style('stroke-width', 3)
                    .style('stroke-radius', '5px')
                    .style('cursor', 'pointer')
                    .on('mouseover', (event: any, d: any ) => {  return d3.select( event.srcElement ).style('stroke', '#8c8f94') })
                    .on('mouseout', (event: any) => {  d3.select( event.srcElement ).style('stroke', '#dcdcde') })
                    .on('click', (event: MouseEvent, currentDatetime: { date: Date, amount: number, week: number } ) => { this.cell_click_handler( currentDatetime ) } )
            );

    }






}