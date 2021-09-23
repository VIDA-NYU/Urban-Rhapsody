import { AudioFrame } from "./audioframe.model";
import { AudioSnippetMeta } from "./audiosnippetmeta.model";

export class AudioSnippet {

    // audio snippet meta
    public metadata!: AudioSnippetMeta;

    // frames
    public frames: AudioFrame[] = [];

    constructor( public uid: string, public length: number = 10 ){}

    public setFrames( frames: AudioFrame[] ): void {
        this.frames = frames;
    }

    

}