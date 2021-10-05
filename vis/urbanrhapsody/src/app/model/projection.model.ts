import { AudioFrame } from "./audioframe.model";

export class Projection {

    public isBrushActive: boolean = false;

    constructor( public id: string, public points: AudioFrame[] ){}

}