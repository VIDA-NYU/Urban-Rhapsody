import { AudioSnippetMeta } from "./audiosnippetmeta.model";

export class AudioSnippet {

    // audio snippet meta
    public metadata!: AudioSnippetMeta;

    constructor( public uid: string, public length: number = 10 ){}


}