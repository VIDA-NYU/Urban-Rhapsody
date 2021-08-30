import { DataState } from "src/app/state/data.state";
import { Datasets } from "src/app/utils/constants/constants";

export class SONYCLoaderController {

    constructor( public dataState: DataState ){}

    public load_data(): void {
        this.dataState.load_data( Datasets.sonyc );
    }

}