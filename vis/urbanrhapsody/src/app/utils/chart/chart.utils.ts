import * as d3 from 'd3';

export class ChartUtils {

    public static create_svg( container: HTMLElement ): d3.Selection<any,any,any,any>{

        // container dimensions
        const width: number = container.clientWidth;
        const height: number = container.clientHeight;

        // creating svg
        return d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
    }

    public static create_group( svgselection: any, margins: { top: number, bottom: number, left: number, right: number } ){
        return svgselection.append('g').attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
    }

    // scales
    public static create_sequential_scale( domain: [number, number], range: [number, number]): d3.ScaleSequential<any, any> {
        return d3.scaleSequential().domain(domain).range(range);
    }

    public static create_band_scale( domain: string[], range: [number, number]): d3.ScaleBand<any> {
        return d3.scaleBand().domain(domain).range(range);
    }

    public static create_color_scale( domain: [number, number] ): d3.ScaleSequential<any, any> {
        return d3.scaleSequential(d3.interpolateYlGn).domain(domain);

    }
}