import { LearnAPI } from "src/app/api/learn.api";
import { DataState } from "src/app/state/data.state";

export class PrototypeLoaderController {

    // available prototypes
    public availablePrototypes: string[] = [];

    constructor( public dataState: DataState ){}

    public async initialize_controller(): Promise<void> {

        const availablePrototypes: { [responseType: string]: string[] } =  await LearnAPI.get_all_prototypes();
        this.availablePrototypes = availablePrototypes.prototypes;

    }

    public prototype_selected( prototypeName: string ): void{

        this.dataState.load_prototype_year_distribution( prototypeName );

    }



}