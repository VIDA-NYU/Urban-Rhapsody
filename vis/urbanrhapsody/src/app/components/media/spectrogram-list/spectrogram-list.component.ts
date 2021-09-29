import { Component, OnInit } from '@angular/core';
import { DataState } from 'src/app/state/data.state';

@Component({
  selector: 'app-spectrogram-list',
  templateUrl: './spectrogram-list.component.html',
  styleUrls: ['./spectrogram-list.component.scss']
})
export class SpectrogramListComponent implements OnInit {

  constructor( public dataState: DataState ) { }

  ngOnInit(): void {}

}
