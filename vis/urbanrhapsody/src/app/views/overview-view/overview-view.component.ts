import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarTimelineComponent } from 'src/app/components/calendar-timeline/calendar-timeline.component';
import { SpectrogramListComponent } from 'src/app/components/media/spectrogram-list/spectrogram-list.component';
import { GlobalEvents } from 'src/app/events/global.events';
import { AudioState } from 'src/app/state/audio/audio.state';
import { DataState } from 'src/app/state/data.state';
import { OverviewViewCalendarTimelineController } from './controllers/overview-view.calendarTimeline.controller';
import { OverviewViewMediaController } from './controllers/overview-view.media.controller';


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
  public calendarTimelineController: OverviewViewCalendarTimelineController = new OverviewViewCalendarTimelineController();
  public mediaController: OverviewViewMediaController = new OverviewViewMediaController();

  // dom refs
  @ViewChild('appcalendartimelineref') appcalendartimelineref!: CalendarTimelineComponent;
  @ViewChild('spectrogramlistref') spectrogramlistref !: SpectrogramListComponent;

  constructor( public globalEvents: GlobalEvents, public dataState: DataState, public audioState: AudioState ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void{
    this.initialize_controllers();
  }

  public initialize_controllers(): void{

    // initializing controllers
    this.calendarTimelineController.initialize_controller( this.appcalendartimelineref, this.globalEvents, this.dataState );
    
  }

}
