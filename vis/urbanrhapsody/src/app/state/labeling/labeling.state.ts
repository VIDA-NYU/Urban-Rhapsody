import { Injectable } from "@angular/core";
import { LabelingAPI } from "src/app/api/labeling.api";


// model
import { AudioFrame } from "src/app/model/audioframe.model";
import { Serializer } from "src/app/utils/serializer.utils";

@Injectable({
    providedIn: 'root'
})

export class LabelingState {

    constructor(){}

    public async label_frames( annotations: string[], frames: AudioFrame[] ): Promise<void> {
        
        // extracting frame UIDs
        const uids: { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } = Serializer.format_uids_labeling_request( frames );

        // saving labels
        await LabelingAPI.label_frames( uids, annotations );

        // synchronizing labels 
        frames.forEach( (frame: AudioFrame) => frame.metadata.add_labels(annotations) );

    }

}