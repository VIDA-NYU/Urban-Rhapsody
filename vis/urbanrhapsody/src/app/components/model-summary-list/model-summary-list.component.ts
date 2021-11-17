import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { PrototypeSummary } from 'src/app/model/prototypesummary.model';

@Component({
  selector: 'app-model-summary-list',
  templateUrl: './model-summary-list.component.html',
  styleUrls: ['./model-summary-list.component.scss']
})
export class ModelSummaryListComponent implements OnInit {

  @Input('prototypesummaries') prototypesummaries: PrototypeSummary[] = [];

  // event outputs
  @Output('onmouseenterrepresentative') onmouseenterrepresentative: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  // @Output('onmouseoutrepresentative') onmouseoutrepresentative: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();

  constructor() { }

  ngOnInit(): void {}

}
