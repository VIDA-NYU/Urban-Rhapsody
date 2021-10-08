import { Injectable } from "@angular/core";
import { LabelingAPI } from "src/app/api/labeling.api";
import { AudioFrame } from "src/app/model/audioframe.model";

// model
import { AudioFrameMeta } from "src/app/model/audioframemeta.model";

@Injectable({
    providedIn: 'root'
})

export class LabelingState {

    constructor(){}

    public async label_frames( annotations: string[], frames: AudioFrame[] ): Promise<void> {
        
        // extracting frame UIDs
        const uids: string[] = frames.map( (frame: AudioFrame) => frame.uid );

        // saving labels
        await LabelingAPI.label_frames( uids, annotations )

    }

}