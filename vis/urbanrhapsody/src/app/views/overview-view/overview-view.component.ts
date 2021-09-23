import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarTimelineComponent } from 'src/app/components/calendar-timeline/calendar-timeline.component';
import { GlobalEvents } from 'src/app/events/global.events';
import { DataState } from 'src/app/state/data.state';
import { OverviewViewController } from './controllers/overview-view.controller';


@Component({
  selector: 'app-overview-view',
  templateUrl: './overview-view.component.html',
  styleUrls: [
    './styles/overview-view.component.scss', 
    './styles/overview-view.component.large.scss', 
    './styles/overview-view.component.medium.scss']
})
export class OverviewViewComponent implements OnInit, AfterViewInit {

  // view controller
  public viewController!: OverviewViewController;

  // dom refs
  @ViewChild('appcalendartimelineref') appcalendartimelineref!: CalendarTimelineComponent;

  constructor( public globalEvents: GlobalEvents, public dataState: DataState ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    // subscribing to events
    this.subscribe_to_events();

  }

  public initialize_controller(): void{

      this.viewController = new OverviewViewController();
  }

  private subscribe_to_events(): void {

    this.globalEvents.yearDistributionLoaded.subscribe(() => {
      this.appcalendartimelineref.calendarTimelineController.get_mock_data( this.dataState.yearAudioDistribution );
      //  this.viewController.calendarTimeline.calendarTimelineController.get_mock_data();
    });

  }

}
