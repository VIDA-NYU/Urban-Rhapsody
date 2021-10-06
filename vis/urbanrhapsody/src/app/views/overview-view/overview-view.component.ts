import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarTimelineComponent } from 'src/app/components/calendar-timeline/calendar-timeline.component';
import { SpectrogramListComponent } from 'src/app/components/media/spectrogram-list/spectrogram-list.component';
import { ProjectionListComponent } from 'src/app/components/projections/projection-list/projection-list.component';
import { GlobalEvents } from 'src/app/events/global.events';
import { AudioState } from 'src/app/state/audio/audio.state';
import { DataState } from 'src/app/state/data.state';
import { ProjectionState } from 'src/app/state/projections/projections.state';
import { OverviewViewCalendarTimelineController } from './controllers/overview-view.calendarTimeline.controller';
import { OverviewViewMediaController } from './controllers/overview-view.media.controller';
import { OverviewViewProjectionsController } from './controllers/overview-view.projections.controller';


@Component({
  selector: 'app-overview-view',
  templateUrl: './overview-view.component.html',
  styleUrls: [
    './styles/overview-view.component.scss', 
    './styles/overview-view.component.large.scss', 
    './styles/overview-view.component.medium.scss']
})
export class OverviewViewComponent implements OnInit, AfterViewInit {

  // view controllers
  // public viewController!: OverviewViewController;
  public calendarTimelineController!: OverviewViewCalendarTimelineController;
  public mediaController!: OverviewViewMediaController;
  public projectioListController!: OverviewViewProjectionsController;

  // dom refs
  @ViewChild('appcalendartimelineref') appcalendartimelineref!: CalendarTimelineComponent;
  @ViewChild('spectrogramlistref') spectrogramlistref !: SpectrogramListComponent;
  @ViewChild('projectionlistref') projectionlistref !: ProjectionListComponent;

  constructor( public globalEvents: GlobalEvents, public dataState: DataState, public audioState: AudioState, public projectionState: ProjectionState ) {}

  ngOnInit(): void {

    // creating controllers
    this.calendarTimelineController = new OverviewViewCalendarTimelineController( this.dataState, this.globalEvents );
    this.mediaController = new OverviewViewMediaController( this.dataState , this.audioState );
    this.projectioListController = new OverviewViewProjectionsController( this.dataState, this.projectionState );

  }

  ngAfterViewInit(): void{
    this.initialize_controllers();
  }

  public initialize_controllers(): void{

    // initializing controllers
    this.calendarTimelineController.initialize_controller( this.appcalendartimelineref );
    this.projectioListController.initialize_controller( this.projectionlistref );
    this.mediaController.initialize_controller( this.spectrogramlistref );
    
  }

}
