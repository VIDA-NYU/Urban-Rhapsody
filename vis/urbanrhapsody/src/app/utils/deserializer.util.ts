// model
import { AudioFrame } from "../model/audioframe.model";
import { AudioSnippet } from "../model/audiosnippet.model";
import { AudioSnippetMeta } from "../model/audiosnippetmeta.model";

// third-party
import * as _ from 'lodash';
import { ObjectFactory } from "./factories/objectfactory";
import { AudioFrameMeta } from "../model/audioframemeta.model";


export class Deserializer {

    public static deserialize_snippets( audioSnippets: any ): { indexedSnippets: any, indexedFrames: any } {

        const indexedSnippets: { [snippetKey: string]: AudioSnippet } = {};
        const indexedFrames: { [frameKey: string]: AudioFrame } = {};

        _.forEach( audioSnippets, audioSnippet => {

            // creating snippet objs
            const currentAudioSnippetMeta: AudioSnippetMeta = ObjectFactory.create_snippet_metadata( audioSnippet.metadata );
            const currentAudioSnippet: AudioSnippet = ObjectFactory.create_snippet( audioSnippet, currentAudioSnippetMeta );

            const currentSnippetFrames: AudioFrame[] = [];
            _.forEach( audioSnippet.frames, rawframe =>{

                // frame metadata
                const frameMetadata: AudioFrameMeta = ObjectFactory.create_frame_metadata( rawframe.metadata );

                // creating new frame
                const frame: AudioFrame = new AudioFrame( rawframe.uid, rawframe.frameIndex, rawframe.embeddingIndex, currentAudioSnippet, frameMetadata );
                currentSnippetFrames.push(frame);

                // indexing frames
                indexedFrames[frame.uid] = frame;

            });

            // setting snippet frames
            currentAudioSnippet.setFrames(currentSnippetFrames);
            
            // indexing snippet
            indexedSnippets[ currentAudioSnippet.uid ] = currentAudioSnippet;

        });

        return {indexedSnippets, indexedFrames};

    }

    public static deserialize_projection( incomingCoords: any, frames: { [frameKey: string]: AudioFrame }, projectionID: string ): AudioFrame[] {  

        // filtered frames
        const selectedFrames: AudioFrame[] = [];

        _.forOwn( incomingCoords, (coord, uid) => {   

            const currentFrame: AudioFrame = frames[uid];

            // adding projected coords
            frames[uid].add_projection( coord.x, coord.y, projectionID );

            // adding frame to the selection
            selectedFrames.push( currentFrame );
        });

        return selectedFrames;

    }

}