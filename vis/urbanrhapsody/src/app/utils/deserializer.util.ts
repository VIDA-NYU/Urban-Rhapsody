// model
import { AudioFrame } from "../model/audioframe.model";
import { AudioSnippet } from "../model/audiosnippet.model";
import { AudioSnippetMeta } from "../model/audiosnippetmeta.model";

// third-party
import * as _ from 'lodash';
import { ObjectFactory } from "./factories/objectfactory";
import { AudioFrameMeta } from "../model/audioframemeta.model";
import { PrototypeSummary } from "../model/prototypesummary.model";


export class Deserializer {

    public static deserialize_prototype_year_distribution( response: any ): { [ datetime: string ]: { count: number, frames: string[], paths: any[] } }{

        const prototypeYearDistribution: { [ datetime: string ]: { count: number, frames: any, paths: any[] } } = {};

        _.forEach( response, (representativeIndex: any) => {
            _.forOwn( representativeIndex, (value, day) => {

                if( !(day in prototypeYearDistribution) ){
                    prototypeYearDistribution[day] = { count: 0, frames: new Set<string>(), paths: [] };
                }

                // looping through the frames
                _.forEach( value.frames, ( frameuid: string, index: number ) => {

                    if( !(prototypeYearDistribution[day].frames.has(frameuid)) ){
                        prototypeYearDistribution[day].frames.add(frameuid);
                        prototypeYearDistribution[day].paths.push( value.paths[index] )
                    }
                    
                    
                });

                prototypeYearDistribution[day].count = prototypeYearDistribution[day].frames.size;
            })
        })


        // transforming sets into lists
        _.forOwn( prototypeYearDistribution, (value, day) => {
            value.frames = Array.from(value.frames.values());
        })

        return prototypeYearDistribution;

    }

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

    public static deserialize_prototype_summaries( incomingSummaries: any ): PrototypeSummary[]{


        const summaries: PrototypeSummary[] = [];

        _.forOwn( incomingSummaries, (summary, prototypeName) => { 

            const currentSummary: PrototypeSummary = new PrototypeSummary( prototypeName, summary.labels, summary.accuracy );
            summaries.push(currentSummary);

        }); 

        return summaries;

    }

}