import { AudioFrame } from "src/app/model/audioframe.model";
import { Coords } from "src/app/model/coords.model";
import { Projection } from "src/app/model/projection.model";

// third party
import * as scatter from 'scatter-gl';
import * as _ from 'lodash';
import { EventEmitter } from "@angular/core";
import { ProjectionColorsController } from "./projection-colors.controller";
import { PointColorer } from "scatter-gl/dist/scatter_gl";
import { ProjectionLegendComponent } from "../../projection-legend/projection-legend.component";

export class ProjectionController{

    // color controller
    public projectionColorController: ProjectionColorsController = new ProjectionColorsController();

    // scatterGL references
    public scatterGL!: scatter.ScatterGL;
    public scatterDataset!: scatter.Dataset;

    // event emitters
    public events: { [eventname: string]: EventEmitter<any> } = {};

    // legends ref
    public projectionlegend!: ProjectionLegendComponent;

    // index mapper: maps indices to audioFrames Objs
    public frameMapper: { [frameuid: string]: number } = {};

    constructor( public projection: Projection ){}

    public initialize_projection( container: HTMLElement, projectionlegend: ProjectionLegendComponent, events: { [eventname: string]: EventEmitter<any> } ){

        // attaching events
        this.events = events;

        // legend ref
        this.projectionlegend = projectionlegend;

        this.generate_dataset( this.projection.points, this.projection.id );
        this.generate_projection( container );
        this.render_projection();

        // selecting previously selected frames
        const selectedFrames: AudioFrame[] = this.projection.points.filter( (frame: AudioFrame) => frame.is_selected() );
        this.select_points( selectedFrames );

    }

    public set_brush_mode(): void {

        // setting projection brush flag
        this.projection.isBrushActive = !this.projection.isBrushActive;

        if(this.projection.isBrushActive){ this.scatterGL.setSelectMode();}
        else{ this.scatterGL.setPanMode(); }
    }

    public set_color_scale( event: any ): void  {   

        const colorScale: any = this.projectionColorController.get_color_scale( event.attributeName )
        const pointColorer: PointColorer = this.projectionColorController.get_point_colorer( event.attributeName, event.attributeValue, colorScale, this.projection)
        this.scatterGL.setPointColorer( pointColorer );

        // setting new legends
        this.projectionlegend.projectionLegendController.update_legends( colorScale );

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
            styles: {
                point: this.get_point_style(),
                label: this.get_label_style()
            },
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


    // styles
    private get_point_style(): {} {

        const pointStyle: {} = {
            colorUnselected: 'rgba(200, 200, 200, 1.0)',
            colorNoSelection: 'rgba(200, 200, 200, 1.0)',
            colorSelected: 'rgba(152, 0, 0, 1.0)',
            colorHover: 'rgba(118, 11, 79, 0.7)',
            scaleDefault: 0.2,
            scaleSelected: 2.0,
            scaleHover: 1.2,
            fillOpacity: 0.5
        }

        return pointStyle;

    }

    private get_label_style(): {} {

        const labelStyle: {} = {
            fontSize: 0,
            scaleDefault: 0,
            scaleLarge: 0,
            fillColorSelected: '#ffffff',
            fillColorHover: '#ffffff',
            strokeColorSelected: '#ffffff',
            strokeColorHover: '#ffffff',
            strokeWidth: 0,
            fillWidth: 0,
        }

        return labelStyle;
    }   


}