import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-view',
  templateUrl: './overview-view.component.html',
  styleUrls: [
    './styles/overview-view.component.scss', 
    './styles/overview-view.component.large.scss', 
    './styles/overview-view.component.medium.scss']
})
export class OverviewViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
