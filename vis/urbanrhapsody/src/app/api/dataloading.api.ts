import { environment } from "src/environments/environment";

export class DataLoadingAPI {

    public static async load_data( datasetname: string = 'sonyc', filters: any = {} ): Promise<any> {

        // TODO: remove this mock call
        // const filters: any = {sensors: [5], startDate: "2017-03-07T16:43", endDate: "2017-03-08T16:43"}

        // url
        const url = `${environment.dataserver}/getdata`;

        // post parameters
        const requestParams = { datasetname, filters };
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