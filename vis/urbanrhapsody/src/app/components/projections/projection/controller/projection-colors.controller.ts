import * as d3 from 'd3';
import { PointColorer } from 'scatter-gl/dist/scatter_gl';
import { Projection } from 'src/app/model/projection.model';
import { ChartUtils } from 'src/app/utils/chart/chart.utils';

export class ProjectionColorsController {

    constructor(){} 

    public get_point_colorer(attributeName: any, attributeValue: any, colorScale: any, projection: Projection): PointColorer {

        switch( attributeName ){

            case 'prototype': return this.get_prototype_colorer(colorScale, attributeValue, projection);
            case 'label': return this.get_label_colorer( colorScale, attributeValue, projection);
            default: return this.get_defaut_colorer( colorScale, attributeValue, projection );
        }
    }

    private get_prototype_colorer( colorScale: any, attributeValue: any, projection: Projection ): PointColorer {

        return (i, selectedIndices, hoverIndex) => { 
            const prediction: number = projection.points[i].metadata.get_prototype_prediction( attributeValue );
            return colorScale(prediction);
        }

    }

    private get_label_colorer( colorScale: any, attributeValue: any, projection: Projection ): PointColorer {

        return (i, selectedIndices, hoverIndex) => { 
            const presence: boolean = projection.points[i].metadata.has_label(attributeValue);
            return colorScale( `${presence}` );
        }

    }

    private get_defaut_colorer( colorScale: any, attributeValue: any, projection: Projection ): PointColorer {
        
        return (i, selectedIndices, hoverIndex) => { 
            
            const selected: boolean = projection.points[i].is_selected();
            // const color: string = selected ?  `hsla(${204}, 100%, 50%, 1)` : `hsla(${76}, 100%, 50%, 0.05)`;
            // return color;
            return colorScale( `${selected}` );
        }
    }

    // creating color scales
    public get_color_scale( attributeName: string ): any {

        switch( attributeName ){

            case 'prototype': return this.get_prototype_color_scale();
            case 'label': return this.get_label_color_scale();
            default: return this.get_default_color_scale();
            
        }
    }

    private get_default_color_scale(): d3.ScaleOrdinal<any, any>{
        return ChartUtils.create_ordinal_color_scale( ['true', 'false'] );
    }

    private get_prototype_color_scale(): d3.ScaleSequential<any, any> {
        return ChartUtils.create_sequential_color_scale( [0, 1], d3.interpolateGreens );
    }

    private get_label_color_scale(): d3.ScaleOrdinal<any, any> {
        return ChartUtils.create_ordinal_color_scale( [ 'true', 'false' ] );
    }

}