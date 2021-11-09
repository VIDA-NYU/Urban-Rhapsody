import { Injectable } from "@angular/core";
import { LearnAPI } from "src/app/api/learn.api";
import { AudioFrame } from "src/app/model/audioframe.model";
import { DataState } from "../data.state";

// third-party
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class PrototypeState {

    // calculated prototypes for the current loaded data
    public loadedPrototypes: string[] = [];
    public prototypeSummary: any = null;

    constructor( public dataState: DataState ){}

    public async apply_prototype( prototypeName: string ): Promise<void> {

        // getting all loaded frames
        const loadedFrames: { [frameKey: string]: AudioFrame } = this.dataState.indexedFrames;

        // calculating prototypes
        let likelihoods: any = await LearnAPI.apply_prototype( Object.values(loadedFrames), prototypeName );     
        likelihoods = likelihoods['likelihood']
        
        _.forOwn( likelihoods, (likelihood: number, frameuid: string) => {
            loadedFrames[frameuid].metadata.set_prototype_prediction( prototypeName, likelihood );
        });

        // getting prototype summary
        this.prototypeSummary = await LearnAPI.get_prototype_summary( prototypeName );

        // saving available prototypes
        this.loadedPrototypes.push( prototypeName );
        
    }


    public async refine_prototype( prototypeName: string, labels: string[]): Promise<void>{

        // refining prototype
        await LearnAPI.refine_prototype( prototypeName, labels );

        // flushing
        this.flush_prototypes();
    
        return;
        
    }

    public async get_prototype_summary( prototypeName: string ): Promise<void>{

        const prototypeSummary: any = await LearnAPI.get_prototype_summary( prototypeName );
        return prototypeSummary;
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