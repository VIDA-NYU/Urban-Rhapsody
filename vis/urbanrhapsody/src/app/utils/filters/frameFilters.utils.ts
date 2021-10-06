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
            default:
                return { frames: [], snippets: [] };
        }

    }


  

    public static filter_by_uid( audioFrames: { [frameKey: string]: AudioFrame }, params: any = {} ): {frames: AudioFrame[], snippets: AudioSnippet[]} {

        // selected frames
        const selectedFrames: AudioFrame[] = [];
        const selectedSnippets: Set<AudioSnippet> = new Set<AudioSnippet>();

        _.forEach( params.uids, uid => {
            
            // selecting frames
            const currentFrame: AudioFrame = audioFrames[uid];
            currentFrame.set_selection( true );
            selectedFrames.push(currentFrame);

            // selecting snippets
            selectedSnippets.add( currentFrame.get_snippet() );

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