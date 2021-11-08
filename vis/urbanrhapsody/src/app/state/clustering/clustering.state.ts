import { Injectable } from "@angular/core";
import { LearnAPI } from "src/app/api/learn.api";
import { AudioFrame } from "src/app/model/audioframe.model";
import { Serializer } from "src/app/utils/serializer.utils";


@Injectable({
    providedIn: 'root'
})

export class ClusteringState {

    // loading flag
    public loadingTree: boolean = false;

    // available trees
    public availableTree: any = null;

    constructor(){}

    public async generate_cluster_tree( frames: AudioFrame[] ): Promise<void>{

        // getting all loaded frames
        const requestFrames: any = Serializer.format_uids_cluster_tree_request( frames )

        // requesting tree
        this.loadingTree = true;
        LearnAPI.generate_cluster_tree( requestFrames ).then( (clusterTree: {tree: any}) => {
            
            // setting spinner flag
            this.loadingTree = false;

            // setting available tree
            this.availableTree = clusterTree.tree;
        });
    }


}