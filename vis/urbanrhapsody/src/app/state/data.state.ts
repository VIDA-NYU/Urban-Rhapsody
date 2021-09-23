import { Injectable } from "@angular/core";
import { DataLoadingAPI } from "../api/dataloading.api";
import { LearnAPI } from "../api/learn.api";
import { GlobalEvents } from "../events/global.events";
import { AudioFrame } from "../model/audioframe.model";
import { AudioSnippet } from "../model/audiosnippet.model";
import { Deserializer } from "../utils/deserializer.util";
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class DataState {

    // year distribution of events
    public yearAudioDistribution: { [ datetime: string ]: number } = {};

    // all points loaded at beginning
    public indexedSnippets: { [snippetKey: string]: AudioSnippet }  = {};
    public indexedFrames: { [frameKey: string]: AudioFrame }  = {};

    // all points selected in a bounding box selection
    public selectedFrames: AudioFrame[] = [];
    public selectedSnippets: AudioSnippet[] = [];

    constructor( public globalEvents: GlobalEvents ){}

    // loads the year distribution of similar events
    public async load_year_distribution( frames: AudioFrame[] ): Promise<void> {

        const response: any = await LearnAPI.load_year_distribution( frames, 'UST');
        _.forEach( response, yeardistribution => {
            this.yearAudioDistribution = yeardistribution;
        });

        // emitting loaded event
        this.globalEvents.yearDistributionLoaded.emit();

    } 

    public async load_data( datasetname: string, filters: any = {} ): Promise<void> {

        const lodadeData: any = await DataLoadingAPI.load_data( datasetname, filters );
        const indexedData: {indexedSnippets: any, indexedFrames: any} = Deserializer.deserialize_snippets( lodadeData );

        // saving indexed data
        this.indexedSnippets = indexedData.indexedSnippets;
        this.indexedFrames = indexedData.indexedFrames;
        
        // emitting loaded event
        this.globalEvents.dataLoadDone.emit();
        
    }

}