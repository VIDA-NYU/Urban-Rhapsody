// model
import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioSnippet } from "src/app/model/audiosnippet.model";

// third-party
import * as _ from 'lodash';
import { MiscUtils } from "src/app/utils/misc/misc.utils";

export class SpectrogramListController {

    // configs
    public listSize: number = 10;
    public spectrogramContainerSize: string = '0px';

    // selections 
    public selectedSnippets: AudioSnippet[] = [];
    public showingSnippets: AudioSnippet[] = [];

    constructor(){}

    public initialize_controller( container: HTMLElement ): void{
        
        // setting spectrogram container size
        this.spectrogramContainerSize = MiscUtils.calculate_spectrogram_container_size( this.listSize, container );

    }

    public on_frames_seleceted( event: {frames: AudioFrame[], projectionID: string } ): void{

        // helper set
        const snippets: Set<AudioSnippet> = new Set<AudioSnippet>();
        _.forEach( event.frames, frame => {
            snippets.add( frame.audioSnippet );
        });

        // setting snippets to show
        this.showingSnippets = Array.from( snippets ).slice(0, this.listSize);

    }


}