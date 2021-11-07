import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClusterTreeController } from './controller/cluster-tree.controller';

@Component({
  selector: 'app-cluster-tree',
  templateUrl: './cluster-tree.component.html',
  styleUrls: ['./cluster-tree.component.scss']
})
export class ClusterTreeComponent implements OnInit, AfterViewInit {

  // controller
  public clusterTreeController: ClusterTreeController = new ClusterTreeController();

  // dom refs
  @ViewChild('chartcontainerref') chartcontainerref!: ElementRef;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    // initializing chart
    this.clusterTreeController.initialize_controller( this.chartcontainerref.nativeElement );

  }

}
