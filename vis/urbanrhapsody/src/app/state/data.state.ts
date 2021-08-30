import { Injectable } from "@angular/core";
import { DataLoadingAPI } from "../api/dataloading.api";
import { GlobalEvents } from "../events/global.events";
import { AudioFrame } from "../model/audioframe.model";
import { AudioSnippet } from "../model/audiosnippet.model";
import { Deserializer } from "../utils/deserializer.util";

@Injectable({
    providedIn: 'root'
})

export class DataState {

    // All points loaded at beginning
    public indexedSnippets: { [snippetKey: string]: AudioSnippet }  = {};
    public indexedFrames: { [frameKey: string]: AudioFrame }  = {};

    // all points selected in a bounding box selection
    public selectedFrames: AudioFrame[] = [];
    public selectedSnippets: AudioSnippet[] = [];

    constructor( public globalEvents: GlobalEvents ){}

    public async load_data( datasetname: string ): Promise<void> {

        const lodadeData: any = await DataLoadingAPI.load_data( datasetname );
        const indexedData: {indexedSnippets: any, indexedFrames: any} = Deserializer.deserialize_snippets( lodadeData );

        // saving indexed data
        this.indexedSnippets = indexedData.indexedSnippets;
        this.indexedFrames = indexedData.indexedFrames;
        
        // emitting loaded event
        this.globalEvents.dataLoadDone.emit();
        
    }

}