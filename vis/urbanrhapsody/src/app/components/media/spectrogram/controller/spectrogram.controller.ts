import { ChartUtils } from "src/app/utils/chart/chart.utils";
import * as d3 from 'd3';
import { AudioSnippet } from "src/app/model/audiosnippet.model";

export class SpectrogramController {

    // svg selection
    public svg!: d3.Selection<any,any,any,any>;

    // scales
    public xscale!: d3.ScaleSequential<any, any>

    constructor( public container: HTMLElement, public audioSnippet: AudioSnippet ){}

    public initialize_component(): void {

        // creating svg
        this.svg = ChartUtils.create_svg( this.container );

        // creating scales
        this.xscale = ChartUtils.create_sequential_scale( [0, this.audioSnippet.frames.length ], [0, this.container.clientWidth] );

        // updating frame grid
        this.update_frame_grid();

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
                    .attr('x', (d, i) => { return this.xscale(i); }  )
                    .attr('y', 0 )
                    .attr('width', rectWidth )
                    .attr('height', this.container.clientHeight - 5 )
                    .attr('class', 'frame-rect')
                    .attr('fill', d => 'black' )
                    .style('stroke', 'none')
                    .style('stroke-width', '2px'),
                update => 
                    update.style('opacity', d => { return '50%' } ),
                    // .style('stroke', d => { console.log(this.stroke_picker(d)); return this.stroke_picker(d); } ),
                exit => 
                    exit.remove()
            );

    }


}