import { Component, Input, OnInit } from '@angular/core';
import { PrototypeSummary } from 'src/app/model/prototypesummary.model';

@Component({
  selector: 'app-model-summary-list',
  templateUrl: './model-summary-list.component.html',
  styleUrls: ['./model-summary-list.component.scss']
})
export class ModelSummaryListComponent implements OnInit {

  @Input('prototypesummaries') prototypesummaries: PrototypeSummary[] = [];

  constructor() { }

  ngOnInit(): void {}

}
