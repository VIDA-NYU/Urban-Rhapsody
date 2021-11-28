import { environment } from "src/environments/environment";
import { AudioFrame } from "../model/audioframe.model";
import { Serializer } from "../utils/serializer.utils";

export class LearnAPI {

    public static async generate_projection( projectionType: string, embeddingModel: string, uids: any, projectionParams: any ): Promise<any> {
        
        // url
        const url = `${environment.aiserver}/projectpoints`;

        // post parameters
        const requestParams = { projectionType, embeddingModel, uids, projectionParams };

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

    public static async generate_cluster_tree( uids: any ): Promise<any> {

        // url
        const url = `${environment.aiserver}/generateclustertree`;

        // post parameters
        const requestParams = {  uids };

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

    public static async load_year_distribution( frames: any, k: number ){

        // serializing request
        const uids = Serializer.format_calendar_request(frames);

        // url
        const url = `${environment.aiserver}/getyeardistribution`;

        console.log('URL: ', url)


        // post parameters
        const requestParams = { uids, k };

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

    public static async load_prototype_year_distribution( prototypeName: string, querySize: number, modelConfidence: number ){

        // url
        const url = `${environment.aiserver}/getprototypeyeardistribution`;

        // post parameters
        const requestParams = { prototypeName, querySize, modelConfidence };

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

    public static async get_prototype_summary( prototypeName: string ): Promise<any> {

        // url
        const url = `${environment.aiserver}/getprototypesummary`;

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

    public static async get_all_prototype_summaries(): Promise<any> {

        // url
        const url = `${environment.aiserver}/getprototypeallsummaries`;

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



    // TODO: Remove it from here
    public static async refine_prototype( prototypeName: string, labels: string[] ): Promise<void>{

        // url
        const url = `${environment.aiserver}/refineprototype`;

        // post parameters
        const requestParams = {  prototypeName, labels };

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

    // TODO: Remove it from here
    public static async create_prototype( prototypeName: string, labels: string[] ): Promise<void>{

        // url
        const url = `${environment.aiserver}/createprototype`;

        // post parameters
        const requestParams = {  prototypeName, labels };

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