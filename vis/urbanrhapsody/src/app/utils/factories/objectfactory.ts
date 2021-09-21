import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioSnippet } from "src/app/model/audiosnippet.model";
import { AudioSnippetMeta } from "src/app/model/audiosnippetmeta.model";

export class ObjectFactory {

    public static create_snippet_metadata( rawobj: any ): AudioSnippetMeta {

        // parsing metadata
        const localtime: Date = new Date(Date.parse(rawobj.localtime));

        const snippetMetadata: AudioSnippetMeta = new AudioSnippetMeta( 
            rawobj.sensorID, 
            rawobj.sensorHeight, 
            parseInt(rawobj.recordingHour),
            localtime
        )

        return snippetMetadata;

    }


    public static create_snippet( rawobj: any, metadata: AudioSnippetMeta ): AudioSnippet {

        const audioSnippet: AudioSnippet = new AudioSnippet( rawobj.uid );
        audioSnippet.metadata = metadata;

        return audioSnippet;

    }

    public static create_frame( rawobj: any ): any {

        // const audioFrame: AudioFrame = new AudioFrame( , )

    }

    public static create_frame_metadata( rawobj: any ): any {

        

    }

}