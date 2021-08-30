
// core
import { Injectable } from "@angular/core";

// model
import { Projection } from "../model/projection.model";


@Injectable({
    providedIn: 'root'
})

export class ProjectionState {

    // projection
    public projections: Projection[] = [];

    constructor(){

        // TODO: REMOVE IT
        this.create_new_projection();
    }

    public create_new_projection(): void {

        console.log('creating');

        // creating new projection object
        const projection: Projection = new Projection( '1' );
        this.projections.push( projection );

    }


}


