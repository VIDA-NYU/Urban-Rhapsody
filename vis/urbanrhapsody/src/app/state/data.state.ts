import { Injectable } from "@angular/core";
import { DataLoadingAPI } from "../api/dataloading.api";
import { LearnAPI } from "../api/learn.api";
import { GlobalEvents } from "../events/global.events";
import { AudioFrame } from "../model/audioframe.model";
import { AudioSnippet } from "../model/audiosnippet.model";
import { Deserializer } from "../utils/deserializer.util";
import * as _ from 'lodash';
import { FrameFilters } from "../utils/filters/frameFilters.utils";
import { SnippetSorters } from "../utils/sorters/snippetSorters.utils";

@Injectable({
    providedIn: 'root'
})

export class DataState {

    // loaded days
    public loadedDays: Set<string> = new Set<string>();

    // year distribution of events
    public yearAudioDistribution: { [ datetime: string ]: { count: number, frames: string[] } } = {};

    // all points loaded at beginning
    public indexedSnippets: { [snippetKey: string]: AudioSnippet }  = {};
    public indexedFrames: { [frameKey: string]: AudioFrame }  = {};

    // all points selected in a bounding box selection
    public selectedFrames: AudioFrame[] = [];
    public selectedSnippets: AudioSnippet[] = [];

    constructor( public globalEvents: GlobalEvents ){}


    public is_daily_data_loaded(): boolean {
        return Object.keys( this.indexedSnippets ).length > 0
    }

    public is_yearly_data_loaded(): boolean{
        return Object.keys(this.yearAudioDistribution ).length > 0;
    }

    public add_frames_to_current_selection( frames: AudioFrame[] ): void {

        _.forEach( frames, ( frame: AudioFrame ) => {

            // setting frame selection
            const currentFrame: AudioFrame = this.indexedFrames[ frame.uid ];
            currentFrame.set_selection(true)

            // adding to list of selected frames
            this.selectedFrames.push( frame );
        });

    }

    public remove_frames_from_current_selection( frames: AudioFrame[] ): void {

        // frames to unselecting
        const framesToUnselect: Set<AudioFrame> = new Set<AudioFrame>();

        _.forEach( frames, (frame: AudioFrame) => {

            const currentFrame: AudioFrame = this.indexedFrames[ frame.uid ];
            framesToUnselect.add(currentFrame);

        });

        // unselecting
        FrameFilters.unselect_all( Array.from(framesToUnselect.values()) );

        // updating selected frames
        this.selectedFrames = this.selectedFrames.filter( (frame: AudioFrame) => !framesToUnselect.has(frame) );
        
    }

    public select_frames( params: any = {} ): void {

        let selection: { frames: AudioFrame[], snippets: AudioSnippet[] };

        // unselecting all frames before
        selection = FrameFilters.unselect_all( this.selectedFrames );
        this.selectedFrames = selection.frames;
        this.selectedSnippets = selection.snippets;

        // filtering 
        selection = FrameFilters.filter_proxy( this.indexedFrames, params );
        this.selectedFrames = selection.frames;
        this.selectedSnippets = selection.snippets;

        // sorting snippets
        SnippetSorters.sort_frames('by_datetime', this.selectedSnippets);
    } 

    // loads the year distribution of similar events
    public async load_year_distribution( frames: AudioFrame[], k: number ): Promise<void> {

        // flushing loaded data before load new data
        this.flush_loaded_data();

        const response: any = await LearnAPI.load_year_distribution( frames, k );
        
        _.forEach( response, yeardistribution => {
            this.yearAudioDistribution = yeardistribution;
        });

        // emitting loaded event
        this.globalEvents.yearDistributionLoaded.emit();

    } 

    // loads the year distribution of similar events
    public async load_prototype_year_distribution( prototypeName: string, querySize: number, modelConfidence: number ): Promise<void> {

            // flushing previously loaded data
            this.flush_loaded_data();

            // requesting prototype data
            const response: any = await LearnAPI.load_prototype_year_distribution( prototypeName, querySize, modelConfidence );
            // _.forEach( response, yeardistribution => {
            Deserializer.deserialize_prototype_year_distribution(response);
                // this.yearAudioDistribution = yeardistribution;
            // });
    
            // emitting loaded event
            // this.globalEvents.yearDistributionLoaded.emit();
    
    } 


    public async load_data( datasetname: string, filters: any = {} ): Promise<void> {

        // flushing loaded data;
        this.flush_loaded_data();

        // saving all loaded days
        this.loadedDays = new Set( filters.days );

        const lodadeData: any = await DataLoadingAPI.load_data( datasetname, filters );
        const indexedData: {indexedSnippets: any, indexedFrames: any} = Deserializer.deserialize_snippets( lodadeData );

        // saving indexed data
        this.indexedSnippets = indexedData.indexedSnippets;
        this.indexedFrames = indexedData.indexedFrames;
        
        // emitting loaded event
        this.globalEvents.dataLoadDone.emit();
        
    }


    public flush_loaded_data(): void {

        // unselecting all frames before
        const selection = FrameFilters.unselect_all( this.selectedFrames );
        this.selectedFrames = selection.frames;
        this.selectedSnippets = selection.snippets;

        // all points loaded at beginning
        this.indexedFrames = {};
        this.indexedSnippets = {};

    }

}