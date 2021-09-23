import { environment } from 'src/environments/environment';

export class MediaAPI {

    public static async get_encoded_spectrogram( snippetuid: string, dataset: string ): Promise<any> {

        // url
        const url = `${environment.dataserver}/getencodedspectrogram`;

        // post parameters
        const requestParams = { dataset,  snippetuid };
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


    public static async get_encoded_audio( snippetuid: string, dataset: string ): Promise<any> {

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