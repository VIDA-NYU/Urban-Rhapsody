import * as d3 from 'd3';

export class ChartUtils {

    public static create_svg( container: HTMLElement, zindex: number = 1 ): d3.Selection<any,any,any,any>{

        // container dimensions
        const width: number = container.clientWidth;
        const height: number = container.clientHeight;

        // creating svg
        return d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('z-index', zindex);
    }

    public static create_group( svgselection: any, margins: { top: number, bottom: number, left: number, right: number } ){
        return svgselection.append('g').attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
    }

    public static create_brush( selection: d3.Selection<any,any,any,any>, margins: { top: number, bottom: number, left: number, right: number }, container: HTMLElement ): any {

        // creating brush
        const brush = d3.brushX()
            .extent([ [0, 0], [container.clientWidth - margins.right - margins.left, container.clientHeight - margins.bottom - margins.top ] ]);
        
        // appending group
        selection.append('g').attr('class', 'brush').call(brush);

        return brush;
    }

    // scales
    public static create_sequential_scale( domain: [any, any], range: [number, number] ): d3.ScaleSequential<any, any> {
        return d3.scaleSequential().domain(domain).range(range);
    }

    public static create_linear_scale(domain: [any, any], range: [number, number]): d3.ScaleLinear<any, any> {
        return d3.scaleLinear().domain(domain).range(range);
    }

    public static create_band_scale( domain: string[], range: [number, number]): d3.ScaleBand<any> {
        return d3.scaleBand().domain(domain).range(range);
    }

    public static create_sequential_color_scale( domain: [number, number], colorScale: any = d3.interpolateBlues  ): d3.ScaleSequential<any, any> {
        return d3.scaleSequential(colorScale).domain(domain);
    }

    public static create_ordinal_color_scale( domain: string[] ): d3.ScaleOrdinal<any, any>{

        // const randomColor: number = Math.floor(Math.random() * 10);
        const colors: string[] = d3.schemeCategory10.slice(0, domain.length );
        // onst colors: string[] = d3.schemeCategory10.slice( randomColor , randomColor+2 );

        // const colors: string[][] = [['#519D3E', '#C8C8C8'], ['#3A76AF', '#C8C8C8'], ['#EF8536', '#C8C8C8']];
        // const colors: string[] = ['#519D3E', '#C8C8C8'];
        // const colors: string[] = ['#3A76AF', '#C8C8C8'];
        // const colors: string[] = ['#EF8536', '#C8C8C8'];
        // const currentColor: string[] = colors[ Math.floor(Math.random()*colors.length) ];
        return d3.scaleOrdinal(colors).domain(domain);
        
    }

    // images
    public static change_img_src( imgContainer: HTMLElement, newsrc: string ): void {
        d3.select(imgContainer).select('img').attr('src', newsrc);
    } 
}