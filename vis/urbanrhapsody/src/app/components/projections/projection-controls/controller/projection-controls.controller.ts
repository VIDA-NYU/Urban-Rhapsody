import { EventEmitter } from "@angular/core";

export class ProjectionControlsController {

    // event emitters
    public events: { [eventname: string]: EventEmitter<any> } = {};

    constructor(){}

    public initialize_controller( events: { [eventname: string]: EventEmitter<any> } ): void{

        this.events = events;

    }

    public select_new_color_scale( attributeName: string, attributeValue: string | number ): void {
        this.events['onnewcolorscaleselected'].emit({ attributeName, attributeValue });
    }

}