import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarTimelineComponent } from 'src/app/components/calendar-timeline/calendar-timeline.component';
import { SpectrogramListComponent } from 'src/app/components/media/spectrogram-list/spectrogram-list.component';
import { ProjectionListComponent } from 'src/app/components/projections/projection-list/projection-list.component';
import { DialogManager } from 'src/app/dialogs/dialog-manager.service';
import { GlobalEvents } from 'src/app/events/global.events';
import { AudioState } from 'src/app/state/audio/audio.state';
import { DataState } from 'src/app/state/data.state';
import { ProjectionState } from 'src/app/state/projections/projections.state';
import { OverviewViewCalendarTimelineController } from './controllers/overview-view.calendarTimeline.controller';
import { OverviewViewController } from './controllers/overview-view.controller';
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
  public overviewViewController!: OverviewViewController;

  // dom refs
  @ViewChild('appcalendartimelineref') appcalendartimelineref!: CalendarTimelineComponent;
  @ViewChild('spectrogramlistref') spectrogramlistref !: SpectrogramListComponent;
  @ViewChild('projectionlistref') projectionlistref !: ProjectionListComponent;

  constructor( public globalEvents: GlobalEvents, public dataState: DataState, public audioState: AudioState, public projectionState: ProjectionState, public dialogManager: DialogManager ) {}

  ngOnInit(): void {

    // creating controller
    this.overviewViewController = new OverviewViewController( this.globalEvents, this.dataState, this.audioState, this.projectionState, this.dialogManager );

  }

  ngAfterViewInit(): void {

    this.initialize_controllers();
  
  }

  public initialize_controllers(): void{
  
    this.overviewViewController.initialize_controllers( this.appcalendartimelineref, this.spectrogramlistref, this.projectionlistref );

  }

}
