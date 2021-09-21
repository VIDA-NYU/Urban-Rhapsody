import { AudioFrameMeta } from "./audioframemeta.model";
import { AudioSnippet } from "./audiosnippet.model";
import { Coords } from "./coords.model";

export class AudioFrame {

    // projections generated
    public projections: { [projectionID: string]: Coords } = {};


    constructor( 
        public uid: string, 
        public frameIndex: number, 
        // public metadata: AudioFrameMeta, 
        public embeddingIndex: number,
        public audioSnippet: AudioSnippet,  ){}

}