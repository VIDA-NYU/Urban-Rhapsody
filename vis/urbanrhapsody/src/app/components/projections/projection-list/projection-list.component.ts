import { Component, OnInit } from '@angular/core';
import { ProjectionState } from 'src/app/state/projections/projections.state';


@Component({
  selector: 'app-projection-list',
  templateUrl: './projection-list.component.html',
  styleUrls: ['./projection-list.component.scss']
})
export class ProjectionListComponent implements OnInit {

  constructor( public projectionState: ProjectionState ) { }

  ngOnInit(): void {}

}
