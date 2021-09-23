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

    public is_selected( ): boolean {
        return this.selected;
    }

    public get_snippet(): AudioSnippet{
        return this.audioSnippet;
    }
}