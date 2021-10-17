import { CalendarTimelineComponent } from "src/app/components/calendar-timeline/calendar-timeline.component";
import { SpectrogramListComponent } from "src/app/components/media/spectrogram-list/spectrogram-list.component";
import { ProjectionListComponent } from "src/app/components/projections/projection-list/projection-list.component";
import { DialogManager } from "src/app/dialogs/dialog-manager.service";
import { GlobalEvents } from "src/app/events/global.events";
import { AudioState } from "src/app/state/audio/audio.state";
import { DataState } from "src/app/state/data.state";
import { ProjectionState } from "src/app/state/projections/projections.state";
import { PrototypeState } from "src/app/state/prototype/prototype.state";
import { OverviewViewCalendarTimelineController } from "./overview-view.calendarTimeline.controller";
import { OverviewViewMediaController } from "./overview-view.media.controller";
import { OverviewViewProjectionsController } from "./overview-view.projections.controller";

export class OverviewViewController {

    public calendarTimelineController!: OverviewViewCalendarTimelineController;
    public mediaController!: OverviewViewMediaController;
    public projectioListController!: OverviewViewProjectionsController;

    constructor( 
        public globalEvents: GlobalEvents, 
        public dataState: DataState, 
        public audioState: AudioState, 
        public projectionState: ProjectionState, 
        public dialogManager: DialogManager,
        public prototypeState: PrototypeState, ){

         // creating controllers
        this.calendarTimelineController = new OverviewViewCalendarTimelineController( this.dataState, this.globalEvents );
        this.mediaController = new OverviewViewMediaController( this.dataState , this.audioState );
        this.projectioListController = new OverviewViewProjectionsController( this.dataState, this.projectionState, this.dialogManager, prototypeState );

    }

    public initialize_controllers( appcalendartimelineref: CalendarTimelineComponent, spectrogramlistref : SpectrogramListComponent, projectionlistref : ProjectionListComponent ): void {

        // initializing controllers
        this.calendarTimelineController.initialize_controller( appcalendartimelineref );
        this.projectioListController.initialize_controller( projectionlistref );
        this.mediaController.initialize_controller( spectrogramlistref );

    }


    public async on_calendar_heatmap_cell_clicked( event: any ): Promise<void> {

        if( !this.dataState.loadedDays.has( event.day ) ){

            // loading all frames from a day
            await this.dataState.load_data( 'sonyc', { days: [event.day] });

            this.projectioListController.flush_projections();
            await this.projectioListController.add_new_projection();
        }

        // selecting points that were retrieved by ann       
        let uids: string[] = this.dataState.yearAudioDistribution[event.day].frames;       
        this.dataState.select_frames( { filtertype: 'uids', uids } );

        // selecting frames on projection
        this.projectioListController.select_frames( this.dataState.selectedFrames );
        
    }

}