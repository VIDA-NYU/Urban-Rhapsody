import { environment } from "src/environments/environment";

export class LabelingAPI {

    public static async label_frames( uids: { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } }, annotations: string[] ): Promise<void> {

        // url
        const url = `${environment.userserver}/setframeannotations`;

        // post parameters
        const requestParams = {  uids, annotations };

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

    public static async negative_label_frames( uids: { [uid: string]: { embeddingIndex: number, sensorID: string, day: string, snippetID: string } }, annotations: string[] ): Promise<void> {

        // url
        const url = `${environment.userserver}/setframenegativeannotations`;

        // post parameters
        const requestParams = {  uids, annotations };

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


    public static async get_all_labels(): Promise<{ labels: string[] }> {

        // url
        const url = `${environment.userserver}/getalllabels`;

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