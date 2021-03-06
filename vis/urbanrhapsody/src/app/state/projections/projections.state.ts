// core
import { Injectable } from "@angular/core";

// apis
import { LearnAPI } from "src/app/api/learn.api";

// model
import { Projection } from "src/app/model/projection.model";
import { AudioFrame } from "src/app/model/audioframe.model";

// utils
import { MiscUtils } from "src/app/utils/misc/misc.utils";
import { Serializer } from "src/app/utils/serializer.utils";
import { Deserializer } from 'src/app/utils/deserializer.util';

// state
import { DataState } from "../data.state";
import { ProjectionFilters } from "src/app/utils/filters/projectionFilters.utils";

@Injectable({
    providedIn: 'root'
})

export class ProjectionState {

    constructor( public dataState: DataState ){}

    // overview projections
    public projections: Projection[] = [];

    // loading projection
    public isLoadingProjection: boolean = false;

    public async add_new_projection( projectionAction: string, projectionType: string,  params: any = {} ): Promise<void> {

        // setting loading flag
        this.isLoadingProjection = true;

        // generating projection ID
        // TODO: make a unique check
        const projectionID: string = MiscUtils.UID_generator();

        const frames: { [frameKey: string]: AudioFrame } = this.dataState.indexedFrames;
        const filteredFrames: AudioFrame[] = ProjectionFilters.filter_proxy( projectionAction, frames, this.dataState.selectedFrames )

        // serializing request
        let requestUIDs!: { [frameKey: string]: any };
        if( projectionAction !== 'learn'){
            requestUIDs  = Serializer.format_uids_projection_request_sonyc( filteredFrames );
        } else {
            const formattedObj  = Serializer.format_uids_projection_metric_learning_request( filteredFrames );
            requestUIDs = formattedObj.formattedObj;
            params.labels = formattedObj.labels;
            projectionType = 'learn'
        }

        // requesting new projection
        const response: any = await LearnAPI.generate_projection( 
            projectionType,
            'openl3',
            requestUIDs,
            params );

        
        // deserializing
        const updatedFrames: AudioFrame[] = Deserializer.deserialize_projection( response, frames, projectionID );

        // adding projection
        const projection: Projection = new Projection( projectionID, updatedFrames );
        this.projections.push(  projection );

        // setting loading flag
        this.isLoadingProjection = false;

    }

    public flush_projections(): void {

        this.projections = [];
        
    }


    public delete_projection( projectionUID: string ): void {

        // removing projection with same UIDS
        this.projections = this.projections.filter( (projection: Projection) => projection.id !== projectionUID  );

    }

}