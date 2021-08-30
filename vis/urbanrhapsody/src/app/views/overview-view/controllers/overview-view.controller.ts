import { GlobalEvents } from "src/app/events/global.events";
import { DataState } from "src/app/state/data.state";
import { OverviewViewTimelineController } from "./overview-view.timeline.controller";

export class OverviewViewController {

    // view controllers
    public timelineController!: OverviewViewTimelineController;

    constructor( public dataState: DataState, public globalEvents: GlobalEvents, elementRefs: {} ){

        // initizling view controllers
        this.initialize_section_controllers( elementRefs );
        
    }

    public initialize_section_controllers( elementRefs: {} ){

        this.timelineController = new OverviewViewTimelineController( this.dataState, this.globalEvents, elementRefs );

    }


}