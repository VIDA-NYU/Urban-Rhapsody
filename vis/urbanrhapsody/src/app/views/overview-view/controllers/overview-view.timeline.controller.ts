import { TimelineComponent } from "src/app/components/timeline/timeline.component";
import { GlobalEvents } from "src/app/events/global.events";
import { AudioSnippet } from "src/app/model/audiosnippet.model";
import { DataState } from "src/app/state/data.state";


export class OverviewViewTimelineController {

    // timeline component ref
    public timelineRef!: TimelineComponent; 

    constructor( public dataState: DataState, public globalEvents: GlobalEvents, elementRefs: any ){

        // saving necessary element refs
        this.timelineRef = elementRefs['timelineref'];

        // subscribing to events
        this.subscribe_to_events();
    }

    public subscribe_to_events(){

        this.globalEvents.dataLoadDone.subscribe( () => { this.initialize_timeline() });
    }

    private initialize_timeline(): void{

        // this.timelineRef.timelineController.render_timeline( Object.values( this.dataState.indexedSnippets ) );
    }




}