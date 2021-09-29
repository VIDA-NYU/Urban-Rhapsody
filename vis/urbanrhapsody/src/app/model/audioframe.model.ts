import { AudioFrameMeta } from "./audioframemeta.model";
import { AudioSnippet } from "./audiosnippet.model";
import { Coords } from "./coords.model";

export class AudioFrame {

    // projections generated
    public projections: { [projectionID: string]: Coords } = {};

    // selected flag
    private selected: boolean = false;

    constructor( 
        public uid: string, 
        public frameIndex: number, 
        // public metadata: AudioFrameMeta, 
        public embeddingIndex: number,
        public audioSnippet: AudioSnippet,  ){}


    public set_selection( selected: boolean ){
        this.selected = selected;
    }

    public is_selected(): boolean {
        return this.selected;
    }

    public get_snippet(): AudioSnippet{
        return this.audioSnippet;
    }

    public add_projection( x: number | string, y: number | string, projectionID: string ){

        // adding '+' in front of the coord to ensure type
        const coord: Coords = new Coords( +x, +y);
        this.projections[projectionID] = coord;
    }

    public get_projection( id: string ): Coords {

        if( id in this.projections ){
            return this.projections[id];
        }
        return new Coords(0, 0);
    }
}