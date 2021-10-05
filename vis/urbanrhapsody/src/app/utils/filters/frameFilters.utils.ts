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

        // set helper
        // const uids: string = params.uids;
        

        _.forEach( params.uids, uid => {
            
            console.log('uids: ', uid);
            // const currentFrame: AudioFrame = audioFrames[uid];
            // console.log(currentFrame);

        });
        
        return { frames: [], snippets: [] };

        // const filteredFrames: AudioFrame[] = audioFrames.filter( frame => )

    }  
    
    

    // unselection
    public static unselect_all( audioFrames: AudioFrame[] ): {frames: AudioFrame[], snippets: AudioSnippet[]} {

        _.forEach( audioFrames, frame => {
            frame.set_selection(false);
        });

        return { frames: [], snippets: [] };
    } 


}