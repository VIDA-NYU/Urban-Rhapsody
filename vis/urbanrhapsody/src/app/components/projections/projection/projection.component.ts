import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectionController } from './controller/projection.controller';



@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.scss']
})
export class ProjectionComponent implements OnInit, AfterViewInit {

  // DOM REFS
  @ViewChild('canvasref') canvasref!: ElementRef;

  // component controller
  public projectionController!: ProjectionController;

  constructor() { 
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    this.projectionController = new ProjectionController();

    this.projectionController.initialize_projection( this.canvasref.nativeElement );
    
  }

}
