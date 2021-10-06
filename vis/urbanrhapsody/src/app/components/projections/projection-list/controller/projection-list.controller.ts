import { QueryList } from "@angular/core";
import { AudioFrame } from "src/app/model/audioframe.model";
import { ProjectionComponent } from "../../projection/projection.component";

export class ProjectionListController {

    // projection refs
    public projectionComponents!: QueryList<ProjectionComponent>

    constructor(){}

    public initialize_controller( projectionrefs: QueryList<ProjectionComponent> ): void {
        this.projectionComponents = projectionrefs;
    }

    public select_frames( frames: AudioFrame[] ): void {

        this.projectionComponents.forEach( ( projection: ProjectionComponent ) => {
            projection.projectionController.select_points( frames );
        });

    }

}