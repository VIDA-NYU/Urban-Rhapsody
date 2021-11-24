import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GlobalEvents } from 'src/app/events/global.events';
import { DataState } from 'src/app/state/data.state';
import { PrototypeState } from 'src/app/state/prototype/prototype.state';
import { ClusterTreeController } from './controller/cluster-tree.controller';

@Component({
  selector: 'app-cluster-tree',
  templateUrl: './cluster-tree.component.html',
  styleUrls: ['./cluster-tree.component.scss']
})
export class ClusterTreeComponent implements OnInit, AfterViewInit {

  //refs
  public clusterTree: any = null;

  // controller
  public clusterTreeController: ClusterTreeController = new ClusterTreeController();

  // outputs
  @Output('clusternodeselected') clusternodeselected: EventEmitter<{'uids': string[]}> = new EventEmitter<{'uids': string[]}>();

  // dom refs
  @ViewChild('chartcontainerref') chartcontainerref!: ElementRef;


  // state inputs
  // @Input('prototypestate') prototypestate!: PrototypeState;
  @Input('prototypes') prototypes: string[] = [];
  @Input('datastate') datastate!: DataState;

  // inputs
  @Input('isloadingtree') isLoadingTree: boolean = false;
  // @Input('clustertree') clustertree!: any;
  @Input('clustertree') set clustertree( clusterTree: any ){
    this.clusterTree = clusterTree;
    if(clusterTree !== null && this.prototypes.length != 0 ){
      this.clusterTreeController.update_tree( clusterTree, this.prototypes );
    } 
  } 

  constructor( public globalEvents: GlobalEvents, public dataState: DataState ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    // events
    const events: {} = {
      'clusternodeselected': this.clusternodeselected
    }

    // initializing chart
    this.clusterTreeController.initialize_controller( this.chartcontainerref.nativeElement, events, this.dataState );

    // subscribing to events
    this.subscribe_to_events();

  }

  public subscribe_to_events(): void {

    this.globalEvents.prototypeApplied.subscribe( () => {
      if(this.clusterTree !== null && this.prototypes.length != 0 ){ this.clusterTreeController.update_tree( this.clusterTree, this.prototypes ); }
    });

  }

}
