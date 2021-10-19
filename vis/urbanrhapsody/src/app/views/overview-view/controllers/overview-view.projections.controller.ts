import { ProjectionListComponent } from "src/app/components/projections/projection-list/projection-list.component";
import { DialogManager } from "src/app/dialogs/dialog-manager.service";
import { AudioFrame } from "src/app/model/audioframe.model";
import { DataState } from "src/app/state/data.state";
import { ProjectionState } from "src/app/state/projections/projections.state";
import { PrototypeState } from "src/app/state/prototype/prototype.state";

export class OverviewViewProjectionsController {

    // component ref
    public projectionlistref !: ProjectionListComponent;

    constructor( 
        public dataState: DataState, 
        public projectionState: ProjectionState, 
        public dialogManager: DialogManager,
        public prototypeState: PrototypeState ){}

    public async add_new_projection( ): Promise<void> {

        // adding new projection
        await this.projectionState.add_new_projection('umap', {} );
    }

    public flush_projections(): void {

        this.projectionState.flush_projections();

    }

    public initialize_controller( projectionlistref: ProjectionListComponent ): void {

        // saving component ref
        this.projectionlistref = projectionlistref;

    }

    public select_frames( frames: AudioFrame[] ): void {

        this.projectionlistref.projectionListController.select_frames( frames );

    }

    public on_label_icon_clicked(): void {

        this.dialogManager.openDialog('frame-labeling-dialog');

    }

    public on_frames_brushed( event: { frames: AudioFrame[] } ): void{

        // selecting frames
        const uids: string[] = event.frames.map( frame => frame.uid );
        this.dataState.select_frames( { filtertype: 'uids', uids } );

    }

    
}