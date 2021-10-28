import { Injectable } from "@angular/core";
import { LabelingAPI } from "src/app/api/labeling.api";


// model
import { AudioFrame } from "src/app/model/audioframe.model";
import { Serializer } from "src/app/utils/serializer.utils";

// third-party
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class LabelingState {

    // all available labels to show
    public availableLabels: string[] = [];

    constructor(){}

    public load_available_labels( frames: AudioFrame[] ): void {

        const labelSet: Set<string> = new Set<string>();
        _.forEach( frames, (frame: AudioFrame) => {
            
            const frameLabels: string[] = frame.metadata.get_labels();
            _.forEach(frameLabels, (label: string) => {
                labelSet.add( label );
            });
        });


        // setting available labels
        this.availableLabels = Array.from(labelSet.values());

    }

    public update_available_labels( annotations: string[] ): void{

        const helperSet: Set<string> = new Set<string>(this.availableLabels);
        _.forEach( annotations, (annotation: string) => {
            helperSet.add(annotation);
        });

        // updating
        this.availableLabels = Array.from(helperSet.values());

    }

    public async label_frames( annotations: string[], frames: AudioFrame[] ): Promise<void> {
        
        // extracting frame UIDs
        const uids: { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } = Serializer.format_uids_labeling_request( frames );

        // saving labels
        await LabelingAPI.label_frames( uids, annotations );

        // synchronizing labels 
        frames.forEach( (frame: AudioFrame) => frame.metadata.add_labels(annotations) );

        // updating available labels
        this.update_available_labels( annotations );
    }

}