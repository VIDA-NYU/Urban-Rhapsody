import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioFrameMeta } from "src/app/model/audioframemeta.model";
import { AudioSnippet } from "src/app/model/audiosnippet.model";
import { AudioSnippetMeta } from "src/app/model/audiosnippetmeta.model";

export class ObjectFactory {

    public static create_snippet_metadata( rawobj: any ): AudioSnippetMeta {

        // parsing metadata
        const localDate = rawobj.localdate.split('-');
        const localTime = rawobj.localtime.split(':');
        const localDatetime: Date = new Date( localDate[0], localDate[1], localDate[2], localTime[0], localTime[1], localTime[2]);


        const snippetMetadata: AudioSnippetMeta = new AudioSnippetMeta( 
            rawobj.sensorID, 
            rawobj.sensorHeight, 
            parseInt(rawobj.recordingHour),
            // rawobj.localtime,
            localDatetime,
            rawobj.localdate
        )

        return snippetMetadata;

    }


    public static create_snippet( rawobj: any, metadata: AudioSnippetMeta ): AudioSnippet {

        const audioSnippet: AudioSnippet = new AudioSnippet( rawobj.uid );
        audioSnippet.metadata = metadata;

        return audioSnippet;

    }

    public static create_frame_metadata( rawobj: any ): AudioFrameMeta {

        const frameMetadata: AudioFrameMeta = new AudioFrameMeta( rawobj.annotations );
        return frameMetadata;

    }
}