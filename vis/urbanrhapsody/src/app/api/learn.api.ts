import { environment } from "src/environments/environment";
import { AudioFrame } from "../model/audioframe.model";
import { Serializer } from "../utils/serializer.utils";

export class LearnAPI {

    public static async generate_projection( dataset: string, projectionType: string, embeddingModel: string, uids: any, projectionParams: any ): Promise<any> {
        
        // url
        const url = `${environment.aiserver}/projectpoints`;

        // post parameters
        const requestParams = { dataset, projectionType, embeddingModel, uids, projectionParams };
        // console.log(`post data: ${JSON.stringify(params)}`);

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

    public static async load_year_distribution( frames: AudioFrame[], dataset: string ){

        // serializing request
        const uids = Serializer.format_uids_request( frames );

        // url
        const url = `${environment.aiserver}/getyeardistribution`;

        // post parameters
        const requestParams = { uids, dataset };
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