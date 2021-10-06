import { ProjectionListComponent } from "src/app/components/projections/projection-list/projection-list.component";
import { AudioFrame } from "src/app/model/audioframe.model";
import { DataState } from "src/app/state/data.state";
import { ProjectionState } from "src/app/state/projections/projections.state";

export class OverviewViewProjectionsController {

    // component ref
    public projectionlistref !: ProjectionListComponent;

    constructor( public dataState: DataState, public projectionState: ProjectionState ){}

    public initialize_controller( projectionlistref: ProjectionListComponent ): void {

        // saving component ref
        this.projectionlistref = projectionlistref;

    }

    public on_frames_brushed( event: { frames: AudioFrame[] } ): void{

        // selecting frames
        const uids: string[] = event.frames.map( frame => frame.uid );
        this.dataState.select_frames( { filtertype: 'uids', uids } );

    }

}