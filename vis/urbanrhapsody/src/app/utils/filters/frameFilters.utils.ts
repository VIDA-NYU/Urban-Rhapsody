// model
import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioSnippet } from "src/app/model/audiosnippet.model";

// third-party
import * as _ from "lodash";

export class FrameFilters {


    public static filter_proxy( audioFrames: { [frameKey: string]: AudioFrame }, params: any = {} ): {frames: AudioFrame[], snippets: AudioSnippet[]} {

        switch (params.filtertype) {
            case 'uids':
                return FrameFilters.filter_by_uid( audioFrames, params );
            case 'hours':
                return FrameFilters.filter_by_hour_range( audioFrames, params );
            case 'prototype':
                return FrameFilters.filter_by_prototype( audioFrames, params );
            default:
                return { frames: [], snippets: [] };
        }

    }


    public static filter_by_prototype( audioFrames: { [frameKey: string]: AudioFrame }, params: any = {} ): {frames: AudioFrame[], snippets: AudioSnippet[]} {

        // selected frames
        const selectedFrames: AudioFrame[] = [];
        const selectedSnippets: Set<AudioSnippet> = new Set<AudioSnippet>();

        // hour range
        const prototypeRange: number[] = params.prototypeRange.map( (rangenumber: number) => rangenumber * 0.1 );

        _.forOwn( audioFrames, (frame: AudioFrame, uid: string ) => {

            // selecting frames
            // const frameHour: number = frame.get_snippet().metadata.recordingHour;
            const prototypeProbability: number = frame.metadata.get_prototype_prediction( params.prototypeName );

            if( prototypeProbability >= prototypeRange[0] && prototypeProbability <= prototypeRange[1] ){
                
                // seleting frames
                frame.set_selection( true );
                selectedFrames.push(frame);

                // selecting snippets
                selectedSnippets.add( frame.get_snippet() );
            }

        });


        return { frames: selectedFrames, snippets: Array.from(selectedSnippets.values()) };
    }

    public static filter_by_uid( audioFrames: { [frameKey: string]: AudioFrame }, params: any = {} ): {frames: AudioFrame[], snippets: AudioSnippet[]} {

        // selected frames
        const selectedFrames: AudioFrame[] = [];
        const selectedSnippets: Set<AudioSnippet> = new Set<AudioSnippet>();

        _.forEach( params.uids, uid => {
            
            if( uid in audioFrames ){

                // selecting frames
                const currentFrame: AudioFrame = audioFrames[uid];
                currentFrame.set_selection( true );
                selectedFrames.push(currentFrame);

                // selecting snippets
                selectedSnippets.add( currentFrame.get_snippet() );

            }

        });


        return { frames: selectedFrames, snippets: Array.from(selectedSnippets.values()) };

    }  
    
    public static filter_by_hour_range( audioFrames: { [frameKey: string]: AudioFrame }, params: any = {} ): {frames: AudioFrame[], snippets: AudioSnippet[]}{

        // selected frames
        const selectedFrames: AudioFrame[] = [];
        const selectedSnippets: Set<AudioSnippet> = new Set<AudioSnippet>();

        _.forOwn( audioFrames, (frame: AudioFrame, uid: string ) => {

            // hour range
            const hourRange: number[] = params.hourRange;

            // selecting frames
            const frameHour: number = frame.get_snippet().metadata.recordingHour;

            if( frameHour >= hourRange[0] && frameHour <= hourRange[1] ){
                
                // seleting frames
                frame.set_selection( true );
                selectedFrames.push(frame);

                // selecting snippets
                selectedSnippets.add( frame.get_snippet() );
            }

           

        });


        return { frames: selectedFrames, snippets: Array.from(selectedSnippets.values()) };

    }

    // unselection
    public static unselect_all( audioFrames: AudioFrame[] ): {frames: AudioFrame[], snippets: AudioSnippet[]} {

        _.forEach( audioFrames, frame => {
            frame.set_selection(false);
        });

        return { frames: [], snippets: [] };
    } 


}