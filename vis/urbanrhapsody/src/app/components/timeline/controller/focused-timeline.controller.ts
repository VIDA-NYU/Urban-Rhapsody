import { AudioSnippet } from "src/app/model/audiosnippet.model";

// third-party
import * as d3 from 'd3';
import { ElementRef } from "@angular/core";

export class FocusedTimelineController{    

    // defining margins
    public margins: { top: number, right: number, bottom: number, left: number } = { top: 50, right: 50, bottom: 50, left: 50 };

    // component container
    public container!: HTMLElement;

    // svg
    public svg: any = null;
    public group: any = null;


    // scales
    private xScale: any = null;
    private yScale: any = null;
    private colorScale: any = null;

                                                                                                                     

    
    constructor(){}

    public attach_refs( container: HTMLElement ): void {

        this.container = container;

    }

    public render_timeline( audioSnippets: AudioSnippet[] ): void{

        // initializing elements
        this.initialize_timeline_elements( audioSnippets );

        // reduce test
        
        const area = d3.area()
            .curve(d3.curveLinear)
            .x( (d: any) =>  { return this.xScale(d.metadata.localTime)} )
            .y0( this.yScale(0) )
            .y1( (d: any) => this.yScale( d.metadata.recordingHour + Math.random() * 3 ) );


        this.group    
            .append('path')
            .datum( audioSnippets )
            .style('fill', 'blue')
            .attr('d', area );
            
            
    }

    private reduce_test( audioSnippets: AudioSnippet[]  ): void {

        const bintest: any[] = [];
        audioSnippets.map( snippet => {
            if(bintest.length === 0){
                
            }
        });
    }

    private initialize_timeline_elements( audioSnippets: AudioSnippet[] ): void {

        // initializing components
        if(this.svg === null) this.initialize_svg();
        if(this.group === null ) this.initialize_group();

        // initializing scales
        if(this.xScale === null) this.create_xscale( audioSnippets );
        if(this.yScale === null) this.create_yscale( audioSnippets );
        if(this.colorScale === null ) this.create_color_scale( audioSnippets );


    }

    private initialize_group(): void {

        this.group = this.svg
            .append('g')
            .attr('transform', 'translate(' + this.margins.left + ',' + this.margins.top + ')')
    }

    private initialize_svg(): void {

        const width: number = this.container.clientWidth;
        const height: number = this.container.clientHeight;

        this.svg = d3.select( this.container )  
            .append('svg')
            .attr('width', width)
            .attr('height', height);
    }

    private create_xscale( audioSnippets: AudioSnippet[] ): void {

        const dateRange: any = d3.extent( audioSnippets, (snippet: AudioSnippet) => { return snippet.metadata.localTime } )

        this.xScale = d3.scaleUtc()
            .domain( dateRange )
            .range( [ 0, this.container.clientWidth - this.margins.right - this.margins.left ] )

    }

    private create_yscale( audioSnippets: AudioSnippet[] ): void {

        const maxAttribute: any = d3.max( audioSnippets, (snippet: AudioSnippet) =>  snippet.metadata.recordingHour + 5  )

        this.yScale = d3.scaleLinear()
            .domain([0, maxAttribute]).nice()
            .range([this.container.clientHeight - this.margins.top - this.margins.bottom, 0])

    }

    private create_color_scale( audioSnippets: AudioSnippet[] ): void{

        this.colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, 10]);

    }



}