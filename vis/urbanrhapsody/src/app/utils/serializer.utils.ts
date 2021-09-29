import { AudioFrame } from "../model/audioframe.model";
import * as _ from 'lodash';

export class Serializer {


    public static format_uids_request( audioFrames: AudioFrame[] ): { [uid: string]: { 'embeddingIndex': number } } {

        const formattedObj:  { [uid: string]: { 'embeddingIndex': number } } = {};

        _.forEach( audioFrames, frame => {
            formattedObj[ frame.uid ] = { 'embeddingIndex': frame.embeddingIndex  };
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
}