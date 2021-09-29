import { AudioFrame } from "src/app/model/audioframe.model";
import { Coords } from "src/app/model/coords.model";
import { Projection } from "src/app/model/projection.model";

// third party
import * as scatter from 'scatter-gl';
import * as _ from 'lodash';

export class ProjectionController{

    // scatterGL references
    public scatterGL: scatter.ScatterGL | any = null;
    public scatterDataset: scatter.Dataset | any = null;

    constructor( public projection: Projection ){}

    public initialize_projection( container: HTMLElement ){

        this.generate_dataset( this.projection.points, this.projection.id );
        this.generate_projection( container );
        this.render_projection();

        this.scatterGL.setSelectMode();
    }

    private render_projection(): void {
        this.scatterGL.render( this.scatterDataset );
    }

    private generate_projection( container: HTMLElement ): void{

        this.scatterGL = new scatter.ScatterGL( container, {
            // onSelect: (points: number[]) => {
            //         // this.selection_handler( points );
            // },
            // onClick: (point: number | null ) => {
            //     // this.click_handler( point );
            // },
            // styles: {
            //         // point: this.get_point_style(),
            //         // label: this.get_label_style()
            // },
            orbitControls: {
                    zoomSpeed: 1.125,
            }});
    
    }

    private generate_dataset( datapoints: AudioFrame[], projectionUID: string ): void {

        // loading points
        const points: any = datapoints.map( (point: AudioFrame, index: number) => {
            
            // uid to uid mapper
            // this.uidMapper[point.uid] = index;

            // returning point coords
            const projectedCoords: Coords = point.get_projection(projectionUID);
            return [projectedCoords.x, projectedCoords.y]
        
        });

        // creating scatter dataset
        this.scatterDataset = new scatter.ScatterGL.Dataset(points);
    }

}