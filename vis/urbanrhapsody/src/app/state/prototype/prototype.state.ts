import { Injectable } from "@angular/core";
import { LearnAPI } from "src/app/api/learn.api";
import { AudioFrame } from "src/app/model/audioframe.model";
import { DataState } from "../data.state";

// third-party
import * as _ from 'lodash';
import { PrototypeSummary } from "src/app/model/prototypesummary.model";
import { Deserializer } from "src/app/utils/deserializer.util";

@Injectable({
    providedIn: 'root'
})

export class PrototypeState {

    // calculated prototypes for the current loaded data
    public loadedPrototypes: string[] = [];
    public prototypeSummaries: PrototypeSummary[] = [];

    constructor( public dataState: DataState ){

        // loading all available summaries
        this.load_all_prototype_summaries();

    }

    public async apply_prototype( prototypeName: string ): Promise<void> {

        // getting all loaded frames
        const loadedFrames: { [frameKey: string]: AudioFrame } = this.dataState.indexedFrames;

        // calculating prototypes
        let likelihoods: any = await LearnAPI.apply_prototype( Object.values(loadedFrames), prototypeName );     
        likelihoods = likelihoods['likelihood']
        
        _.forOwn( likelihoods, (likelihood: number, frameuid: string) => {
            loadedFrames[frameuid].metadata.set_prototype_prediction( prototypeName, likelihood );
        });

        // saving available prototypes
        this.loadedPrototypes.push( prototypeName );
        
    }

    public async create_prototype( prototypeName: string, labelSet: string[] ): Promise<void>{

        // creating prototype
        await LearnAPI.create_prototype( prototypeName, labelSet );

        // updating available summaries
        await this.load_all_prototype_summaries();

    }


    public async refine_prototype( prototypeName: string, labels: string[]): Promise<void>{

        // refining prototype
        await LearnAPI.refine_prototype( prototypeName, labels );

        // updating available summaries
        await this.load_all_prototype_summaries();

        // flushing
        this.flush_prototypes();
    
        return;
        
    }

    public async load_all_prototype_summaries(): Promise<void>{

        let prototypeSummaries: any = await LearnAPI.get_all_prototype_summaries();
        this.prototypeSummaries = Deserializer.deserialize_prototype_summaries( prototypeSummaries );

        _.forEach( this.prototypeSummaries, (summary: PrototypeSummary) => {

            let representativeFrames: any[] = summary.representativeFrames.map( (frame: any) => { return { 'sensorID': frame.sensorid, 'day': frame.day, 'snippetID': frame.filename.split('.')[0], 'index': frame.index } } );
            const filters: any = { 'snippets': representativeFrames };
            
            this.dataState.load_data_by_examples( filters ).then( (indexedSnippets: any) => {
                summary.representativeFrames = representativeFrames.map( (frame: any) =>  indexedSnippets[frame.snippetID].frames[frame.index]  );
            });
        });


    }

    public async get_all_prototypes(): Promise<{ prototypes: string[] }> {

        const prototypes: any = await LearnAPI.get_all_prototypes();
        return prototypes;
        
    }

    public flush_prototypes(): void{

        // cleaning loaded prototypes
        this.loadedPrototypes = [];

    }

}