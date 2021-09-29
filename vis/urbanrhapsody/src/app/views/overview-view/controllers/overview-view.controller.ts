import { CalendarTimelineComponent } from "src/app/components/calendar-timeline/calendar-timeline.component";
import { GlobalEvents } from "src/app/events/global.events";
import { DataState } from "src/app/state/data.state";

export class OverviewViewController {
    
    constructor( public appcalendartimelineref: CalendarTimelineComponent, public globalEvents: GlobalEvents, public dataState: DataState ){
        // subscribing to events
        this.subscribe_to_events();
    }

    public load_day_audio( event: any ){
        this.dataState.load_data( 'sonyc', { days: [event.day] })
    }

    private subscribe_to_events(): void {    
        
        this.globalEvents.yearDistributionLoaded.subscribe(() => {

            const yearDistribution: any = this.appcalendartimelineref.calendarTimelineController.generate_base_dataset( this.dataState.yearAudioDistribution );
            this.appcalendartimelineref.calendarTimelineController.render_chart( yearDistribution );
        
        });
    }

    

}