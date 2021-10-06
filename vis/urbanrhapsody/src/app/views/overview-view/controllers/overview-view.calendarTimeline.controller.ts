import { CalendarTimelineComponent } from "src/app/components/calendar-timeline/calendar-timeline.component";
import { GlobalEvents } from "src/app/events/global.events";
import { DataState } from "src/app/state/data.state";

// third-party
import * as _ from 'lodash';

export class OverviewViewCalendarTimelineController {
 
    public appcalendartimelineref!: CalendarTimelineComponent;

    constructor( public dataState: DataState, public globalEvents: GlobalEvents ){}

    public initialize_controller( appcalendartimelineref: CalendarTimelineComponent): void{

        // component ref
        this.appcalendartimelineref = appcalendartimelineref;

        // subscribing to events
        this.subscribe_to_events();

    }

    public async load_day_audio( event: any ){

        // loading all frames from a day
        await this.dataState.load_data( 'sonyc', { days: [event.day] });

        // selecting points that were retrieved by ann       
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