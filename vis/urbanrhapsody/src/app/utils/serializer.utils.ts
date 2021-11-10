import { AudioFrame } from "../model/audioframe.model";
import * as _ from 'lodash';
import { AudioSnippet } from "../model/audiosnippet.model";

export class Serializer {


    public static format_uids_request( audioFrames: AudioFrame[] ): { [uid: string]: { 'embeddingIndex': number } } {

        const formattedObj:  { [uid: string]: { 'embeddingIndex': number } } = {};

        _.forEach( audioFrames, frame => {
            formattedObj[ frame.uid ] = { 'embeddingIndex': frame.embeddingIndex  };
        });

        return formattedObj;

    }

    public static format_uids_labeling_request( audioFrames: AudioFrame[] ): { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } {

        const formattedObj:  { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } = {};

        _.forEach( audioFrames, frame => {
            formattedObj[ frame.uid ] = 
                {   
                    embeddingIndex: frame.embeddingIndex,
                    sensorID: frame.audioSnippet.metadata.sensorID,
                    day: frame.audioSnippet.metadata.localdate,
                    snippetID: frame.audioSnippet.uid
                };
        });

        return formattedObj;

    }

    public static format_uids_apply_prototype_request( audioFrames: AudioFrame[] ): { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } {

        const formattedObj:  { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } = {};

        _.forEach( audioFrames, frame => {
            formattedObj[ frame.uid ] = 
                {   
                    embeddingIndex: frame.embeddingIndex,
                    sensorID: frame.audioSnippet.metadata.sensorID,
                    day: frame.audioSnippet.metadata.localdate,
                    snippetID: frame.audioSnippet.uid
                };
        });

        return formattedObj;

    }

    public static format_uids_projection_request_sonyc( audioFrames: AudioFrame[] ): { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } {

        const formattedObj:  { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } = {};

        _.forEach( audioFrames, frame => {
            formattedObj[ frame.uid ] = 
                {   
                    embeddingIndex: frame.embeddingIndex,
                    sensorID: frame.audioSnippet.metadata.sensorID,
                    day: frame.audioSnippet.metadata.localdate,
                    snippetID: frame.audioSnippet.uid
                };
        });

        return formattedObj;

    }

    public static format_uids_projection_metric_learning_request( audioFrames: AudioFrame[] ): { formattedObj: { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } }, labels: string[][] }  {

        const formattedObj:  { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } = {};
        const labels: string[][] = [];

        _.forEach( audioFrames, frame => {
            formattedObj[ frame.uid ] = 
                {   
                    embeddingIndex: frame.embeddingIndex,
                    sensorID: frame.audioSnippet.metadata.sensorID,
                    day: frame.audioSnippet.metadata.localdate,
                    snippetID: frame.audioSnippet.uid
                };
            
            // 
            labels.push( frame.metadata.get_labels() );
        });

        return { formattedObj, labels };

    }

    public static format_uids_cluster_tree_request( audioFrames: AudioFrame[] ): { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } {

        const formattedObj:  { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } = {};

        _.forEach( audioFrames, frame => {
            formattedObj[ frame.uid ] = 
                {   
                    embeddingIndex: frame.embeddingIndex,
                    sensorID: frame.audioSnippet.metadata.sensorID,
                    day: frame.audioSnippet.metadata.localdate,
                    snippetID: frame.audioSnippet.uid
                };
        });

        return formattedObj;

    }

    public static format_uids_spectrogram_request( audioSnippet: AudioSnippet ):  { sensorID: string, day: string, snippetID: string } {

        const requestOBJ: { sensorID: string, day: string, snippetID: string } = {
            sensorID: audioSnippet.metadata.sensorID,
            day: audioSnippet.metadata.localdate,
            snippetID: audioSnippet.uid
        }

        return requestOBJ;

    }

    public static format_uids_snippet_request( audioSnippet: AudioSnippet ):  { sensorID: string, day: string, snippetID: string } {

        const requestOBJ: { sensorID: string, day: string, snippetID: string } = {
            sensorID: audioSnippet.metadata.sensorID,
            day: audioSnippet.metadata.localdate,
            snippetID: audioSnippet.uid
        }

        return requestOBJ;

    }


    public static format_calendar_request( audioFrames: AudioFrame[] ): { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } {

        const formattedObj:  { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } } = {};

        _.forEach( audioFrames, frame => {
            formattedObj[ frame.uid ] = 
                {   
                    embeddingIndex: frame.embeddingIndex,
                    sensorID: frame.audioSnippet.metadata.sensorID,
                    day: frame.audioSnippet.metadata.localdate,
                    snippetID: frame.audioSnippet.uid
                };
        });

        return formattedObj;

    }
}