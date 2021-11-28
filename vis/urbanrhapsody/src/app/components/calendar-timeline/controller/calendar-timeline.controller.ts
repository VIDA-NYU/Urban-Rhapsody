import * as d3 from 'd3';
import { ChartUtils } from 'src/app/utils/chart/chart.utils';
import { MiscUtils } from 'src/app/utils/misc/misc.utils';
import { WEEKDAYS, MONTHS } from '../../../utils/constants/constants';

export class CalendarTimelineController {

    // constants
    public cellGap: number = 5;
    public monthGap: number = 20;

    // scales
    public xScale!: d3.ScaleSequential<any, any>;
    public yScale!: d3.ScaleBand<any>;
    public colorScale!: d3.ScaleSequential<any, any>;
    // public monthScale!: d3.ScaleBand<any>;
    public monthScale!: any;

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

    public generate_base_dataset( yearAudioDistribution: { [ datetime: string ]: { count: number, frames: string[] } } ) {

        // year distribution dates
        const yearDistribution: { date: Date, amount: number, week: number, distribution: any[] }[][] = [];
        for(let i = 0; i < 12; i++ ){
            yearDistribution.push([]);
        }

        // let currentDate: Date = new Date(Date.parse('2017-01-01'));
        // const startDate: Date = new Date(Date.parse('2017-01-01'));
        let currentDate = new Date('January 02, 2017 00:00:00');
        const startDate = new Date('January 02, 2017 00:00:00');

        // maxNeighbors to generate colorscale
        let maxNeighbors: number = 0;

        while(currentDate.getFullYear() === 2017){

            const weekNumber: Date[] = d3.timeWeeks(startDate, currentDate);

            // Improve it
            let currentAmount: number = 0;
            let currentDistribution:{ period: number, count: number }[] = [];
            const datestr: string = MiscUtils.format_US_datetime(currentDate); 
            if( datestr in yearAudioDistribution ) {

                currentAmount = yearAudioDistribution[datestr].count;
                maxNeighbors = Math.max( maxNeighbors, currentAmount );
                currentDistribution = MiscUtils.generate_slice_distribution( yearAudioDistribution[datestr] )

            }

            const currentDateCopy: Date = new Date(currentDate);
            const currentObj: { date: Date, amount: number, week: number,  distribution: any[] } = { date: currentDateCopy, amount: currentAmount, week: weekNumber.length, distribution: currentDistribution };
            yearDistribution[currentDateCopy.getMonth()].push( currentObj );
            

            // incrementing date
            currentDate.setDate( currentDate.getDate() + 1);
            currentDate = new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() );

        }  

        // updating color scale
        this.colorScale = ChartUtils.create_sequential_color_scale( [0, maxNeighbors] );

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

        
        if( !this.yScale ) this.yScale = ChartUtils.create_band_scale( WEEKDAYS, [0, height - this.margins.top - this.margins.bottom] );
        if( !this.monthScale ) this.monthScale = ChartUtils.create_band_scale( MONTHS, [0, width - this.margins.left - this.margins.right  ] );
        if( !this.xScale ) this.xScale = ChartUtils.create_sequential_scale( [0, 6], [0, this.monthScale.bandwidth() - this.monthGap] );

        this.update_x_axis();
        this.update_y_axis();
    }

    private update_x_axis(): void{

        this.xAxisGroup = this.svg
            .append('g')
            .style('font-size', 20)
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

    public render_chart( yearDistribution: any ): void {

        // generating base dataset
        const dataset: any = this.generate_base_dataset( yearDistribution );
        
        // set transitions
        const t = this.svg.transition().duration(400);

        // cell dimensions
        const cellWidth: number = this.xScale(1) - this.xScale(0);
        const cellHeight: number = this.yScale.bandwidth();

        // appending month groups
        const months = this.chartgroup
            .selectAll('.month-group')
            .data( dataset )
            .join(
                (enter: any) => enter
                    .append('g')
                    .attr('class', 'month-group')
                    .attr('transform', ( yearData: { date: Date, amount: number, week: number }[], index: number ) => 'translate(' + ( this.monthScale(MONTHS[index]) ) + ',' + 0 + ')')     
            );

        // const cells = months
        // .selectAll('.day-cell')
        // .data( ( monthData: any ) => monthData )
        // .join(
        //     (enter: any) => enter
        //         .append('rect')
        //         .attr('class', 'day-cell')
        //         .attr('x', (monthData: { date: Date, amount: number, week: number } ) => { 
        //             const firstDayOfTheMonth: Date = new Date(  monthData.date.getFullYear(), monthData.date.getMonth(), 1 )
        //             const timeInWeeks: any = d3.timeWeek.count( firstDayOfTheMonth, monthData.date );
        //             return this.xScale(timeInWeeks);
        //         })
        //         .attr('y', (monthData: { date: Date, amount: number, week: number } ) => this.yScale(WEEKDAYS[ monthData.date.getDay()]) )
        //         .attr('rx', 3)
        //         .attr('ry', 3)
        //         .attr('width', cellWidth - this.cellGap)
        //         .attr('height', cellHeight - this.cellGap)
        //         .attr('fill', (d: any) => { return this.colorScale(d.amount) } )
        //         .style('stroke', '#dcdcde')
        //         .style('stroke-width', 3)
        //         .style('stroke-radius', '5px')
        //         .style('cursor', 'pointer')
        //         .on('mouseover', (event: any, d: any ) => { return d3.select( event.srcElement ).style('stroke', '#8c8f94') })
        //         .on('mouseout', (event: any) => {  d3.select( event.srcElement ).style('stroke', '#dcdcde') })
        //         .on('click', (event: MouseEvent, currentDatetime: { date: Date, amount: number, week: number } ) => { this.cell_click_handler( currentDatetime ) } ),
        //     (update: any) => update.transition(t).attr('fill', (d: any) => { return this.colorScale(d.amount) } ),
        //     (exit: any) => exit.selectAll('.day-cell').remove() 
        // )
        


        /** IMPLEMENTATION WITH DAILY DISTRIBUTION */
        const days = months
            .selectAll('.day-group')
            .data( ( monthData: any ) => monthData )
            .join(
                (enter: any) => enter
                    .append('g')
                    .attr('class', 'day-group')
                    .attr('transform', ( dayData: any, index: number ) => {  
                        const firstDayOfTheMonth: Date = new Date(  dayData.date.getFullYear(), dayData.date.getMonth(), 1 )
                        const timeInWeeks: any = d3.timeWeek.count( firstDayOfTheMonth, dayData.date );
                        this.yScale(WEEKDAYS[ dayData.date.getDay()])
                        return 'translate(' + this.xScale(timeInWeeks) + ',' + this.yScale(WEEKDAYS[ dayData.date.getDay()]) + ')'} ) 
                    .append('rect')
                        .attr('class', 'day-frame')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('rx', 3)
                        .attr('ry', 3)
                        .attr('width', cellWidth - this.cellGap)
                        .attr('height', cellHeight - this.cellGap)
                        .attr('fill', 'transparent')
                        .style('stroke', '#dcdcde')
                        .style('stroke-width', 2)
                        .style('stroke-radius', '5px')
                        .style('cursor', 'pointer')
                        .on('mouseover', (event: any, d: any ) => { console.log(d); return d3.select( event.srcElement ).style('stroke', '#8c8f94') })
                        .on('mouseout', (event: any) => {  d3.select( event.srcElement ).style('stroke', '#dcdcde') })
                        .on('click', (event: MouseEvent, currentDatetime: { date: Date, amount: number, week: number } ) => { this.cell_click_handler( currentDatetime ) } ),
            )            


        //  bar dimensions
        const barXScale: d3.ScaleSequential<number, number> = ChartUtils.create_sequential_scale( [0, 3], [0, cellWidth - this.cellGap - 6 ] );
        //let barYScale!: d3.ScaleSequential<number, number>; // = ChartUtils.create_sequential_scale( [0, 4], [0, cellHeight - this.cellGap - 2] );
        const barWidth = barXScale(1) - barXScale(0) - 1;
                    
        const day = months.selectAll('.day-group')
        const periods = day
            .selectAll('.hour-bar')
            .data( ( dayData: any ) => { return dayData.distribution } )
            .join(
                (enter: any) => enter
                    .append('rect')
                    .attr('class', 'hour-bar')
                    .attr('x', ( data: any, index: any ) => { return barXScale(index); } )
                    .attr('y', ( data: any, index: any ) =>  { 
                        const barYScale = ChartUtils.create_sequential_scale( [0, data.total], [0, cellHeight - this.cellGap - 2] );  
                        return (cellHeight - this.cellGap - 1) - barYScale( data.count ) }  )
                    .attr('width', barWidth )
                    .attr('height',( data: any, index: any ) => { 
                        const barYScale = ChartUtils.create_sequential_scale( [0, data.total], [0, cellHeight - this.cellGap - 2] );  
                        return  barYScale( data.count ); } )
                    .attr('fill', (data: any) => { return this.colorScale(data.total); } ),
                (update: any) => update.transition(t)
                    .attr('y', ( data: any, index: any ) =>  { 
                        const barYScale = ChartUtils.create_sequential_scale( [0, data.total], [0, cellHeight - this.cellGap - 2] );  
                        return (cellHeight - this.cellGap - 1) - barYScale( data.count ) }  )
                        .attr('height',( data: any, index: any ) => { 
                            const barYScale = ChartUtils.create_sequential_scale( [0, data.total], [0, cellHeight - this.cellGap - 2] );  
                            return  barYScale( data.count ); } )
                        .attr('fill', (data: any) => { return this.colorScale(data.total); } ),
                (exit: any) => exit.remove()
            )

 

        // firing event when finished rendering
        this.events['onchartrendered'].emit();

    }

}