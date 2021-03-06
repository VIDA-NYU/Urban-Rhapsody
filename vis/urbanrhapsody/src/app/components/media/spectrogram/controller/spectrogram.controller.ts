// utils
import { ChartUtils } from "src/app/utils/chart/chart.utils";

// third-party
import * as d3 from 'd3';

// core
import { EventEmitter } from "@angular/core";

// model
import { AudioSnippet } from "src/app/model/audiosnippet.model";
import { AudioFrame } from "src/app/model/audioframe.model";
import { MediaAPI } from "src/app/api/media.api";

export class SpectrogramController {

    public contextMenu!: any;

    // svg selection
    public svg!: d3.Selection<any,any,any,any>;

    // scales
    public xscale!: d3.ScaleSequential<any, any>;

    // spectrogram encoding
    public spectrogramEncoding: string = '';

    constructor( 
        public container: HTMLElement, 
        public audioSnippet: AudioSnippet, 
        public eventEmitters: { [emitterName: string]: EventEmitter<any> } ){}

    public initialize_component(): void {

        // creating svg
        this.svg = ChartUtils.create_svg( this.container );

        // creating scales
        this.xscale = ChartUtils.create_sequential_scale( [0, this.audioSnippet.frames.length ], [0, this.container.clientWidth] );

        // getting spectrogram and audio encodings
        this.get_spectrogram_encoding( this.audioSnippet );

        // updating frame grid
        this.update_frame_grid();

    }

    public highlight_frame(frame: AudioFrame): void {
        this.svg
            .selectAll('.frame-rect')
            .data( this.audioSnippet.frames )
            .attr('stroke-width', '3')
            .style('stroke', (currentFrame: AudioFrame) => this.stroke_picker( currentFrame, frame.uid ) );
    }

    public remove_highlight_frame(frame: AudioFrame): void {
        this.svg
            .selectAll('.frame-rect')
            .data( this.audioSnippet.frames )
            .attr('stroke-width', '0')
    }



    public update_frame_grid(): void {
        
        // rect width
        const rectWidth: number = this.xscale(1) - this.xscale(0);

        // D3 NEW WAY OF DOING ENTER UPDATE EXIT
        this.svg
            .selectAll('.frame-rect')
            .data( this.audioSnippet.frames )
            .join(
                enter => 
                    enter.append('rect')
                    .attr('x', (frame: AudioFrame, i: number) => { return this.xscale(i); }  )
                    .attr('y', 0 )
                    .attr('width', rectWidth )
                    .attr('height', this.container.clientHeight )
                    .attr('class', 'frame-rect')
                    .attr('fill', (frame: AudioFrame) => this.fill_picker( frame ) )
                    .attr('stroke', '#1F3F49')
                    .attr('stroke-dasharray', '10,5')
                    .attr('stroke-linecap', 'butt')
                    .attr('stroke-width', '0')
                    .style('cursor', 'pointer')
                    .style('opacity', (frame: AudioFrame) => this.opacity_picker( frame ) )
                    .on('mouseenter', (event: MouseEvent, frame: AudioFrame ) => { this.on_mouse_enter_handler( frame ); })
                    .on('mouseleave', (event: MouseEvent, frame: AudioFrame) => { this.on_mouse_leave_handler( frame ); })
                    .on('click', (event: MouseEvent, frame: AudioFrame) => { this.on_click_handler( event, frame ) }),
                update => 
                    update
                        .attr('fill', (frame: AudioFrame) => this.fill_picker( frame ) )
                        .style('opacity', (frame: AudioFrame) => this.opacity_picker( frame ) ),
                exit => 
                    exit.remove()
            );
    }


    /****************** PRIVATE METHODS ******************/
    // api calls
    private get_spectrogram_encoding( audioSnippet: AudioSnippet ): void{
        MediaAPI.get_encoded_spectrogram( audioSnippet ).then( response => {
            ChartUtils.change_img_src( this.container, response.base64 );
        });
    }

    // event handlers
    private on_mouse_enter_handler( frame: AudioFrame ): void {
        this.eventEmitters.onmouseenterspectrogram.emit({ frame });
    }

    private on_mouse_leave_handler( frame: AudioFrame ): void {
        this.eventEmitters.onmouseleavespectrogram.emit({ frame });
    }

    private on_click_handler( mouseEvent: MouseEvent, frame: AudioFrame ): void {   
        this.eventEmitters.onspectrogramframeclicked.emit({ frame, mouseEvent });
    }


    // style modifiers
    private stroke_picker( audioframe: AudioFrame, selectedUID: string ): string{
        return ( audioframe.uid === selectedUID ) ? '#1F3F49' : 'none';
    }

    private fill_picker( audioFrame: AudioFrame ){
        return audioFrame.is_selected() ? 'transparent' : '#E9E9E9';
    }

    private opacity_picker( audioFrame: AudioFrame ){
        return audioFrame.is_selected() ? '1' : '0.5';
    }



}