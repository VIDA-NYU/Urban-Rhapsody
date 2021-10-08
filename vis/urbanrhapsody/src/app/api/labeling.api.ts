import { environment } from "src/environments/environment";

export class LabelingAPI {

    public static async label_frames( uids: string[], annotations: string[] ): Promise<void> {

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

}