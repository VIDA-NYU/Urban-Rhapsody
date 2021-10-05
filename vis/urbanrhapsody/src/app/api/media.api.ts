import { environment } from 'src/environments/environment';
import { AudioSnippet } from '../model/audiosnippet.model';
import { Serializer } from '../utils/serializer.utils';

export class MediaAPI {

    public static async get_encoded_spectrogram( snippet: AudioSnippet, dataset: string = 'SONYC' ): Promise<any> {

        // url
        const url = `${environment.dataserver}/getencodedspectrogram`;

        // serializing obj for request
        const requestOBJ: { sensorID: string, day: string, snippetID: string } = Serializer.format_uids_spectrogram_request( snippet );

        // post parameters
        const requestParams = { dataset,  snippet: requestOBJ };

        // post header
        const headers = {
            'Content-Type': 'application/json',
        };

        // Return a new promise.
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestParams),
        });

        return await response.json();

    }


    public static async get_encoded_audio( snippetuid: any, dataset: string ): Promise<any> {

        // url
        const url = `${environment.dataserver}/getencodedaudio`;

        // post parameters
        const requestParams = { dataset, snippetuid };
        // console.log(`post data: ${JSON.stringify(requestParams)}`);

        // post header
        const headers = {
            'Content-Type': 'application/json',
        };

        // Return a new promise.
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestParams),
        });

        return await response.json();

    }
}