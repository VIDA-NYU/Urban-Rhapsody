// model
import { AudioFrame } from "../model/audioframe.model";
import { AudioSnippet } from "../model/audiosnippet.model";
import { AudioSnippetMeta } from "../model/audiosnippetmeta.model";

// third-party
import * as _ from 'lodash';
import { ObjectFactory } from "./factories/objectfactory";


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

                const frame: AudioFrame = new AudioFrame( rawframe.uid, rawframe.frameIndex, rawframe.embeddingIndex, currentAudioSnippet )
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

}