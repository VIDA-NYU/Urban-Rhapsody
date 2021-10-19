// model
import { AudioFrame } from "src/app/model/audioframe.model";
import { AudioSnippet } from "src/app/model/audiosnippet.model";

// third-party
import * as _ from 'lodash';
import { MiscUtils } from "src/app/utils/misc/misc.utils";
import { QueryList } from "@angular/core";
import { SpectrogramComponent } from "../../spectrogram/spectrogram.component";
import { PageEvent } from "@angular/material/paginator";

export class SpectrogramListController {

    // spectrogram refs
    public spectrogramRefs!: QueryList<SpectrogramComponent>;

    // configs
    public listSize: number = 10;
    public currentPage: number = 0;
    public spectrogramContainerSize: string = '0px';

    // selections 
    // @Input('selectedsnippets') selectedSnippets: AudioSnippet[] = []; 
    public selectedSnippets: AudioSnippet[] = [];
    public showingSnippets: AudioSnippet[] = [];

    constructor(){}

    public initialize_controller( container: HTMLElement, spectrogramRefs: QueryList<SpectrogramComponent>  ): void {

        // setting spectrogram refs
        this.spectrogramRefs = spectrogramRefs;
        
        // setting spectrogram container size
        this.spectrogramContainerSize = MiscUtils.calculate_spectrogram_container_size( this.listSize, container );

    }

    public on_mouse_entered_frame( frame: AudioFrame ): void {

        this.spectrogramRefs.forEach( (spectrogram: SpectrogramComponent) => {
            if(spectrogram.snippet.uid === frame.get_snippet().uid){
                spectrogram.spectrogramController.highlight_frame(frame);
            } 
        });

    }

    public on_mouse_left_frame( frame: AudioFrame ): void {

        this.spectrogramRefs.forEach( (spectrogram: SpectrogramComponent) => {
            if(spectrogram.snippet.uid === frame.get_snippet().uid){
                spectrogram.spectrogramController.remove_highlight_frame(frame);
            } 
        });

    }

    public update_spectrograms(): void {

        if( !this.spectrogramRefs ){ return }

        this.spectrogramRefs.forEach( (spectrogram: SpectrogramComponent) =>{
            spectrogram.spectrogramController.update_frame_grid();
        });
    }

    public on_page_flipped( event: PageEvent ): void {

        this.currentPage = event.pageIndex;
        this.showingSnippets = this.selectedSnippets.slice( this.listSize*this.currentPage, ((this.listSize*this.currentPage) + this.listSize) );

    }

    public on_frames_selected( audioSnippets: AudioSnippet[] ): void {

        this.currentPage = 0;
        this.selectedSnippets = audioSnippets;
        this.showingSnippets = this.selectedSnippets.slice( this.listSize*this.currentPage, ((this.listSize*this.currentPage) + this.listSize) );

    }


}