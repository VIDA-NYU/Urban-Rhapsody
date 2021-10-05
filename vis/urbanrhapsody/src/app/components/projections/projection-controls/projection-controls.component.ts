import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Projection } from 'src/app/model/projection.model';

@Component({
  selector: 'app-projection-controls',
  templateUrl: './projection-controls.component.html',
  styleUrls: ['./projection-controls.component.scss']
})
export class ProjectionControlsComponent implements OnInit {

  // eventemitters
  @Output('onbrushset') onbrushset: EventEmitter<any> = new EventEmitter<any>();

  // inputs
  @Input('projection') projection!: Projection;

  constructor() { }

  ngOnInit(): void {}

}
