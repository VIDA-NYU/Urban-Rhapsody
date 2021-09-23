import { AudioFrame } from "../model/audioframe.model";
import * as _ from 'lodash';

export class Serializer {


    public static format_uids_request( audioFrames: AudioFrame[] ): { [uid: string]: { 'embeddingIndex': number } } {

        const formattedObj:  { [uid: string]: { 'embeddingIndex': number } } = {};

        _.forEach( audioFrames, frame => {
            formattedObj[ frame.uid ] = { 'embeddingIndex': frame.embeddingIndex };
        });

        return formattedObj;

    }
}