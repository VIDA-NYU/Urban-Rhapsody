import { Injectable } from "@angular/core";
import { LabelingAPI } from "src/app/api/labeling.api";


// model
import { AudioFrame } from "src/app/model/audioframe.model";

@Injectable({
    providedIn: 'root'
})

export class LabelingState {

    constructor(){}

    public async label_frames( annotations: string[], frames: AudioFrame[] ): Promise<void> {
        
        // extracting frame UIDs
        const uids: string[] = frames.map( (frame: AudioFrame) => frame.uid );

        // saving labels
        await LabelingAPI.label_frames( uids, annotations );

        // synchronizing labels 
        frames.forEach( (frame: AudioFrame) => frame.metadata.add_labels(annotations) );

    }

}