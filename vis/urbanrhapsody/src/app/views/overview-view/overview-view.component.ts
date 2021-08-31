import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TimelineComponent } from 'src/app/components/timeline/timeline.component';
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
  @ViewChild('timelineref') timelineref!: TimelineComponent


  constructor( public datastate: DataState, public globalEvents: GlobalEvents ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    // initializing controllers
    // this.initialize_controller();

  }

  public initialize_controller(): void{

    // // packing element refs
    // const elementRefs: {} = {
    //   'timelineref': this.timelineref
    // }

    // // initializing controller
    // this.viewController = new OverviewViewController( this.datastate, this.globalEvents, elementRefs );
  
  }

}
