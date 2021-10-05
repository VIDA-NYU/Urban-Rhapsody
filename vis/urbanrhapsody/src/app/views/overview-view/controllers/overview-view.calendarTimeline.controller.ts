import { CalendarTimelineComponent } from "src/app/components/calendar-timeline/calendar-timeline.component";
import { GlobalEvents } from "src/app/events/global.events";
import { DataState } from "src/app/state/data.state";

// third-party
import * as _ from 'lodash';

export class OverviewViewCalendarTimelineController {
 
    public appcalendartimelineref!: CalendarTimelineComponent;

    // state management
    private dataState!: DataState;

    // global events
    public globalEvents!: GlobalEvents;

    constructor(){}

    public initialize_controller( 
        appcalendartimelineref: CalendarTimelineComponent,
        globalEvents: GlobalEvents,
        dataState: DataState ): void{

        this.appcalendartimelineref = appcalendartimelineref;

        // saving events refs
        this.globalEvents = globalEvents;

        // saving state refs
        this.dataState = dataState;

        // subscribing to events
        this.subscribe_to_events();

    }

    public async load_day_audio( event: any ){

        await this.dataState.load_data( 'sonyc', { days: [event.day] });

        // selecting points that were retrieved by ann
        console.log(event.day);
        console.log(this.dataState.yearAudioDistribution);
        
        let uids: string[] = this.dataState.yearAudioDistribution[event.day].frames;       
        this.dataState.select_frames( { filtertype: 'uids', uids } );

    }

    private render_calendar_timeline(): void{

        // selecting points that are rendered in the heatmap calendar
        this.appcalendartimelineref.calendarTimelineController.render_chart( this.dataState.yearAudioDistribution );

    }

    private subscribe_to_events(): void {

        this.globalEvents.yearDistributionLoaded.subscribe( () => {
            this.render_calendar_timeline();
        });

    }

}