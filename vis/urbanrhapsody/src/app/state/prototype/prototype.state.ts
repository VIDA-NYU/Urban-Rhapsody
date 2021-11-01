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

        // saving available prototypes
        this.loadedPrototypes.push( prototypeName );
        
    }


    public flush_prototypes(): void{

        // cleaning loaded prototypes
        this.loadedPrototypes = [];

    }

}