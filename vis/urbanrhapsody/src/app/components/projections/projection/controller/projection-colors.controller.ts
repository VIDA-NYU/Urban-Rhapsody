import * as d3 from 'd3';
import { PointColorer } from 'scatter-gl/dist/scatter_gl';
import { Projection } from 'src/app/model/projection.model';
import { ChartUtils } from 'src/app/utils/chart/chart.utils';

export class ProjectionColorsController {

    constructor(){} 

    public get_point_colorer(attributeName: any, attributeValue: any, colorScale: any, projection: Projection): PointColorer {

        switch( attributeName ){

            case 'prototype': return this.get_prototype_colorer(colorScale, attributeValue, projection);
            default: return this.get_defaut_colorer();
        }
    }

    private get_prototype_colorer( colorScale: any, attributeValue: any, projection: Projection ): PointColorer {

        return (i, selectedIndices, hoverIndex) => { 
            const prediction: number = projection.points[i].metadata.get_prototype_prediction( attributeValue );
            return colorScale(prediction);
        }

    }

    private get_defaut_colorer(): PointColorer {
        
        return (i, selectedIndices, hoverIndex) => { 
            return 'blue';
        }
    }


    // creating color scales
    public get_color_scale( attributeName: string ): any {

        switch( attributeName ){

            case 'prototype': return this.get_prototype_color_scale();
            default: return '#E0E0E0';
            
        }
    }

    private get_prototype_color_scale(): d3.ScaleSequential<any, any> {
        return ChartUtils.create_sequential_color_scale( [0, 1] );
    }

}