import { Injectable } from "@angular/core";
import { LearnAPI } from "src/app/api/learn.api";
import { AudioFrame } from "src/app/model/audioframe.model";
import { Serializer } from "src/app/utils/serializer.utils";


@Injectable({
    providedIn: 'root'
})

export class ClusteringState {

    // available trees
    public availableTrees: any[] = [];

    constructor(){}

    public async generate_cluster_tree( frames: AudioFrame[] ): Promise<void>{

        // getting all loaded frames
        const requestFrames: any = Serializer.format_uids_cluster_tree_request( frames )

        // requesting tree
        LearnAPI.generate_cluster_tree( requestFrames ).then(() => {
            
        });
    }


}