import { AudioFrame } from "src/app/model/audioframe.model";
import { Coords } from "src/app/model/coords.model";
import { Projection } from "src/app/model/projection.model";

// third party
import * as scatter from 'scatter-gl';
import * as _ from 'lodash';
import { EventEmitter } from "@angular/core";

export class ProjectionController{

    // scatterGL references
    public scatterGL!: scatter.ScatterGL;
    public scatterDataset!: scatter.Dataset;

    // event emitters
    public events: { [eventname: string]: EventEmitter<any> } = {};

    // index mapper: maps indices to audioFrames Objs
    public frameMapper: { [frameuid: string]: number } = {};

    constructor( public projection: Projection ){}

    public initialize_projection( container: HTMLElement, events: { [eventname: string]: EventEmitter<any> } ){

        // attaching events
        this.events = events;

        this.generate_dataset( this.projection.points, this.projection.id );
        this.generate_projection( container );
        this.render_projection();

    }

    public set_brush_mode(): void {

        // setting projection brush flag
        this.projection.isBrushActive = !this.projection.isBrushActive;

        if(this.projection.isBrushActive){ this.scatterGL.setSelectMode();}
        else{ this.scatterGL.setPanMode(); }
    }

    public select_points( frames: AudioFrame[] ): void{

        const indices: number[] = frames.map( frame => this.frameMapper[ frame.uid ]);
        this.scatterGL.select( indices );
    }

    // private methods 
    private render_projection(): void {
        this.scatterGL.render( this.scatterDataset );
    }

    private generate_projection( container: HTMLElement ): void{

        this.scatterGL = new scatter.ScatterGL( container, {
            onSelect: (points: number[]) => {
                this.selection_handler( points );
            },
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
            
            // uid to projection index
            this.frameMapper[point.uid] = index;

            // returning point coords
            const projectedCoords: Coords = point.get_projection(projectionUID);
            return [projectedCoords.x, projectedCoords.y]
        
        });

        // creating scatter dataset
        this.scatterDataset = new scatter.ScatterGL.Dataset(points);
    }


    // event handlers
    private selection_handler( points: any ): void {

        // array of selected frames
        const selectedFrames: AudioFrame[] = [];

        _.forEach( points, pointindex => {
            selectedFrames.push( this.projection.points[pointindex] )
        });
        
        // emitting event
        this.events['onpointsselected'].emit({ 'frames': selectedFrames, 'projectionID': this.projection.id })

    }


}