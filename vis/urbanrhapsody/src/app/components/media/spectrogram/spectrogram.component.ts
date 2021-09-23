import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AudioFrame } from 'src/app/model/audioframe.model';
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
  @ViewChild('spectrogramimgref') spectrogramimgref!: ElementRef;

  // outputs
  @Output('onmouseenterspectrogram') onmouseenterspectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onmouseleavespectrogram') onmouseleavespectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onspectrogramframeclicked') onspectrogramframeclicked: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();

  // controller
  public spectrogramController!: SpectrogramController;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    // grouping event emitters
    const eventEmitters: { [emitterName: string]: EventEmitter<any> } = {
      onmouseenterspectrogram: this.onmouseenterspectrogram,
      onmouseleavespectrogram: this.onmouseleavespectrogram,
      onspectrogramframeclicked: this.onspectrogramframeclicked
    };

    // initializing controller
    this.spectrogramController = new SpectrogramController( this.spectrogramcontainerref.nativeElement, this.snippet, eventEmitters );
    this.spectrogramController.initialize_component();

      
  }

}
