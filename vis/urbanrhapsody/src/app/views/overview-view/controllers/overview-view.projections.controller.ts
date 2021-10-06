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

    public async add_new_projection(): Promise<void> {

        // adding new projection
        await this.projectionState.add_new_projection('umap', {});
    }

    public select_frames( frames: AudioFrame[] ): void{
        this.projectionlistref.projectionListController.select_frames( frames );
    }

    public flush_projections(): void {
        this.projectionState.flush_projections();
    }

    public on_frames_brushed( event: { frames: AudioFrame[] } ): void{

        // selecting frames
        const uids: string[] = event.frames.map( frame => frame.uid );
        this.dataState.select_frames( { filtertype: 'uids', uids } );

    }

}