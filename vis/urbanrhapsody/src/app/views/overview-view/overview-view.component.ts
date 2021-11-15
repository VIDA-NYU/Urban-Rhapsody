import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CalendarTimelineComponent } from 'src/app/components/calendar-timeline/calendar-timeline.component';
import { HistogramComponent } from 'src/app/components/histogram/histogram.component';
import { SpectrogramListComponent } from 'src/app/components/media/spectrogram-list/spectrogram-list.component';
import { ProjectionListComponent } from 'src/app/components/projections/projection-list/projection-list.component';
import { DialogManager } from 'src/app/dialogs/dialog-manager.service';
import { GlobalEvents } from 'src/app/events/global.events';
import { AudioState } from 'src/app/state/audio/audio.state';
import { ClusteringState } from 'src/app/state/clustering/clustering.state';
import { DataState } from 'src/app/state/data.state';
import { LabelingState } from 'src/app/state/labeling/labeling.state';
import { ProjectionState } from 'src/app/state/projections/projections.state';
import { PrototypeState } from 'src/app/state/prototype/prototype.state';
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

  // view controllers
  public overviewViewController!: OverviewViewController;

  // dom refs
  @ViewChild('appcalendartimelineref') appcalendartimelineref!: CalendarTimelineComponent;
  @ViewChild('spectrogramlistref') spectrogramlistref !: SpectrogramListComponent;
  @ViewChild('projectionlistref') projectionlistref !: ProjectionListComponent;
  @ViewChild('histogramref') histogramref !: HistogramComponent;
  @ViewChildren('prototypehistogramrefs') prototypehistogramrefs !: QueryList<HistogramComponent>;

  constructor( 
    public globalEvents: GlobalEvents, 
    public dataState: DataState, 
    public audioState: AudioState, 
    public projectionState: ProjectionState,
    public dialogManager: DialogManager,
    public prototypeState: PrototypeState,
    public labelingState: LabelingState,
    public clusteringState: ClusteringState  ) {}

  ngOnInit(): void {

    // creating controller
    this.overviewViewController = new OverviewViewController( this.globalEvents, this.dataState, this.audioState, this.projectionState, this.dialogManager, this.prototypeState, this.labelingState, this.clusteringState );

  }

  ngAfterViewInit(): void {

    this.initialize_controllers();
  
  }

  public initialize_controllers(): void{
  
    this.overviewViewController.initialize_controllers( this.appcalendartimelineref, this.spectrogramlistref, this.projectionlistref, this.histogramref, this.prototypehistogramrefs );

  }

}
