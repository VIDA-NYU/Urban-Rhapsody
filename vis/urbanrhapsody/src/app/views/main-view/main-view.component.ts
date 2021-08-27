import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: [
    './styles/main-view.component.scss', 
    './styles/main-view.component.large.scss', 
    './styles/main-view.component.medium.scss']
})
export class MainViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
