import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioSnippet } from "src/app/model/audiosnippet.model";
import { ChartUtils } from "src/app/utils/chart/chart.utils";

// third-party
import * as d3 from 'd3';

export class FocusedClassificationController {

    // pad
    public pad: number = 2;

    // container
    public container!: HTMLElement;

    // svg selection
    public svg!: d3.Selection<any,any,any,any>;

    // scales
    public xscale!: d3.ScaleSequential<any, any>;
    public colorScale!: d3.ScaleSequential<any, any>;

    constructor( public snippet: AudioSnippet, public prototypeName: string ){}

    public initialize_controller( container: HTMLElement ): void {

        // saving container
        this.container = container;

        // creating svg 
        this.svg = ChartUtils.create_svg( container );

        // creating scales
        this.xscale = ChartUtils.create_sequential_scale( [0, this.snippet.frames.length ], [0, container.clientWidth] );
        this.colorScale = ChartUtils.create_sequential_color_scale([0,1], d3.interpolateGreens );

        // rendering
        this.update_frame_grid();

    }

    public update_frame_grid(): void {
        
        // rect width
        const rectWidth: number = this.xscale(1) - this.xscale(0);

        // D3 NEW WAY OF DOING ENTER UPDATE EXIT
        this.svg
            .selectAll('.frame-rect')
            .data( this.snippet.frames )
            .join(
                enter => 
                    enter.append('rect')
                    .attr('x', (frame: AudioFrame, i: number) => this.xscale(i) + this.pad/2  )
                    .attr('y', this.pad/2 )
                    .attr('rx', 5)
                    .attr('ry', 5)
                    .attr('width', rectWidth - this.pad )
                    .attr('height', this.container.clientHeight - this.pad )
                    .attr('class', 'frame-rect')
                    .attr('fill', (frame: AudioFrame) => this.colorScale( frame.metadata.get_prototype_prediction(this.prototypeName) ) )
                    .attr('stroke', '#1F3F49')
                    .attr('stroke-dasharray', '10,5')
                    .attr('stroke-linecap', 'butt')
                    .attr('stroke-width', '0')
                    .style('cursor', 'pointer'),
                update => 
                    update
                        .attr('fill', (frame: AudioFrame) => this.colorScale(Math.random()) ),
                exit => 
                    exit.remove()
            );
    }
}