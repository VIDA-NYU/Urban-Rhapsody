import { Component, OnInit } from '@angular/core';
import { ProjectionLegendController } from './controller/projection-legend.controller';

@Component({
  selector: 'app-projection-legend',
  templateUrl: './projection-legend.component.html',
  styleUrls: ['./projection-legend.component.scss']
})
export class ProjectionLegendComponent implements OnInit {

  // controller
  public projectionLegendController: ProjectionLegendController = new ProjectionLegendController();

  constructor() { }

  ngOnInit(): void {
    
  }

}
