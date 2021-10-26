// model
import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioSnippet } from "src/app/model/audiosnippet.model";

// third-party
import * as _ from "lodash";

export class ProjectionFilters {


    public static filter_proxy( filterType: string, loadedAudioFrames: { [frameKey: string]: AudioFrame }, selectedFrames: AudioFrame[] ): AudioFrame[] {

        switch (filterType) {
            case 'focus':
                return ProjectionFilters.filter_focused_projection( loadedAudioFrames, selectedFrames );
            case 'remove':
                return ProjectionFilters.filter_removal_projection( loadedAudioFrames, selectedFrames );
            default:
                return Object.values(loadedAudioFrames);
        }

    }


    public static filter_focused_projection( loadedAudioFrames: { [frameKey: string]: AudioFrame }, selectedAudioFrames: AudioFrame[] ): AudioFrame[] {

        // selected frames
        const selectedFrames: AudioFrame[] = [];

        _.forEach( selectedAudioFrames, (frame: AudioFrame) => {

            const currentFrame: AudioFrame = loadedAudioFrames[ frame.uid ];
            selectedFrames.push( currentFrame );

        });

        return selectedFrames;

    }

    public static filter_removal_projection( loadedAudioFrames: { [frameKey: string]: AudioFrame }, selectedAudioFrames: AudioFrame[] ): AudioFrame[] {

        // selected frames
        const selectedFrames: AudioFrame[] = [];

        // creating helpet set of selected uids
        const uids: string[] = selectedAudioFrames.map( (frame: AudioFrame) => frame.uid );
        const helpetSet: Set<string> = new Set( uids );

        _.forOwn( loadedAudioFrames, ( frame: AudioFrame, frameuid: string ) => {

            if( ! helpetSet.has( frameuid ) ){
                const currentFrame: AudioFrame = loadedAudioFrames[ frame.uid ];
                selectedFrames.push( currentFrame );
            }

        });

        return selectedFrames

    }


}