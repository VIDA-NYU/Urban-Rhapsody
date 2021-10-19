import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SensorMapController } from './controller/sensor-map.controller';

@Component({
  selector: 'app-sensor-map',
  templateUrl: './sensor-map.component.html',
  styleUrls: ['./sensor-map.component.scss']
})
export class SensorMapComponent implements OnInit, AfterViewInit {

  // controller
  public sensorMapController: SensorMapController = new SensorMapController();

  // dom refs
  @ViewChild('sensormapcontainer') sensormapcontainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{

    this.sensorMapController.initialize_controller( this.sensormapcontainer.nativeElement );
    
  }

}
