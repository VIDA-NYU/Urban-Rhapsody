import { environment } from "src/environments/environment";
import { AudioFrame } from "../model/audioframe.model";
import { Serializer } from "../utils/serializer.utils";

export class LearnAPI {

    public static async generate_projection( dataset: string, projectionType: string, embeddingModel: string, uids: any, projectionParams: any ): Promise<any> {
        
        // url
        const url = `${environment.aiserver}/projectpoints`;

        // post parameters
        const requestParams = { dataset, projectionType, embeddingModel, uids, projectionParams };

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

    public static async load_year_distribution( frames: any, dataset: string ){

        // serializing request
        const uids = Serializer.format_calendar_request(frames);

        // url
        const url = `${environment.aiserver}/getyeardistribution`;

        // post parameters
        const requestParams = { uids, dataset };

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

    public static async load_prototype_year_distribution( prototypeName: string ){

        // url
        const url = `${environment.aiserver}/getprototypeyeardistribution`;

        // post parameters
        const requestParams = { prototypeName };

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

    public static async get_all_prototypes(): Promise<any>{

        // url
        const url = `${environment.aiserver}/getallprototypes`;

        // post header
        const headers = {
            'Content-Type': 'application/json',
        };

        // Return a new promise.
        const response = await fetch(url, {
            method: 'POST',
            headers
        });

        return await response.json();

    }

    public static async apply_prototype( frames: AudioFrame[], prototypeName: string ){

        // serializing request
        const uids = Serializer.format_uids_apply_prototype_request(frames);

        // url
        const url = `${environment.aiserver}/applyprototype`;

        // post parameters
        const requestParams = { uids, prototypeName };

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