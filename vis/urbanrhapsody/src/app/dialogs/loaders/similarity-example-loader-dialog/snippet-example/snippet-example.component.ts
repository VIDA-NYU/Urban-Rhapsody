import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AudioSnippet } from 'src/app/model/audiosnippet.model';

@Component({
  selector: 'app-snippet-example',
  templateUrl: './snippet-example.component.html',
  styleUrls: ['./snippet-example.component.scss']
})
export class SnippetExampleComponent implements OnInit, AfterViewInit {

  // input snipppet
  @Input('snippet') snippet!: AudioSnippet;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{}

  

}
