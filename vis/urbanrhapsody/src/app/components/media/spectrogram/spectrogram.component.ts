import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';
import { SpectrogramController } from './controller/spectrogram.controller';

@Component({
  selector: 'app-spectrogram',
  templateUrl: './spectrogram.component.html',
  styleUrls: ['./spectrogram.component.scss']
})
export class SpectrogramComponent implements OnInit, AfterViewInit {

  // audio snippet
  @Input('snippet') snippet!: AudioSnippet;

  // dom refs
  @ViewChild('spectrogramcontainerref') spectrogramcontainerref!: ElementRef;

  // controller
  public spectrogramController!: SpectrogramController;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    // initializing controller
    this.spectrogramController = new SpectrogramController( this.spectrogramcontainerref.nativeElement, this.snippet );
    this.spectrogramController.initialize_component();
    
  }

}
