import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SpectrogramComponent } from 'src/app/components/media/spectrogram/spectrogram.component';
import { AudioFrame } from 'src/app/model/audioframe.model';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';

@Component({
  selector: 'app-snippet-example',
  templateUrl: './snippet-example.component.html',
  styleUrls: ['./snippet-example.component.scss']
})
export class SnippetExampleComponent implements OnInit, AfterViewInit {

  // input snipppet
  @Input('snippet') snippet!: AudioSnippet;

  // event emitters
  @Output('onmouseenterspectrogram') onmouseenterspectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onmouseleavespectrogram') onmouseleavespectrogram: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();
  @Output('onspectrogramframeclicked') onspectrogramframeclicked: EventEmitter<{frame: AudioFrame}> = new EventEmitter<{frame: AudioFrame}>();

  // refs
  @ViewChild('spectrogramref') spectrogramref!: SpectrogramComponent;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{}

}
