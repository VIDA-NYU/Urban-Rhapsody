import { MatDialogRef } from "@angular/material/dialog";
import { LearnAPI } from "src/app/api/learn.api";
import { DataState } from "src/app/state/data.state";
import { PrototypeLoaderDialogComponent } from "../prototype-loader-dialog.component";

export class PrototypeLoaderController {

    // dialog ref
    public dialogRef!: MatDialogRef<any>;

    // query params
    public querySize: number = 100;
    public modelConfidence: number = 0.5;

    // available prototypes
    public availablePrototypes: string[] = [];

    constructor( public dataState: DataState ){}

    public async initialize_controller( dialogRef: MatDialogRef<PrototypeLoaderDialogComponent> ): Promise<void> {

        // saving dialog ref
        this.dialogRef = dialogRef;

        // getting available prototypes
        const availablePrototypes: { [responseType: string]: string[] } =  await LearnAPI.get_all_prototypes();
        this.availablePrototypes = availablePrototypes.prototypes;
        
    }

    public prototype_selected( prototypeName: string ): void{

        // requesting prototype
        this.dataState.load_prototype_year_distribution( prototypeName, this.querySize, this.modelConfidence );

        // closing dialog
        this.dialogRef.close();

    }



}