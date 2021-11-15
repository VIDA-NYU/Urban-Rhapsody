import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { LabelingAPI } from "src/app/api/labeling.api";
import { PrototypeState } from "src/app/state/prototype/prototype.state";
import { PrototypeCreationDialogComponent } from "../prototype-creation-dialog.component";

export class PrototypeCreationController {  

    // prototype state
    public prototypeState!: PrototypeState;

    // spinner flag
    public isLoadingPrototype: boolean = false;

    // input label
    public prototypeForm = new FormGroup({prototypeName: new FormControl()});

    // all labels in the database
    public createdLabels: string[] = [];    
    public createdLabelsSet: Set<string> = new Set<string>();

    constructor( public dialogRef: MatDialogRef<PrototypeCreationDialogComponent> ){}

    public async initialize_component( prototypeState: PrototypeState ): Promise<void> {

        // saving prototype state
        this.prototypeState = prototypeState;

        // labels
        const response: { labels: string[] } = await LabelingAPI.get_all_labels();
        this.createdLabels = response.labels;

    }

    public async create_prototype(): Promise<void>{

        // setting spinner
        this.isLoadingPrototype = true;

        // creating prototype
        await this.prototypeState.create_prototype( this.prototypeForm.value.prototypeName, Array.from(this.createdLabelsSet.values()) )
        // await LabelingAPI.create_prototype( this.prototypeForm.value.prototypeName, Array.from(this.createdLabelsSet.values()) )

        // setting spinner
        this.isLoadingPrototype = false;

        // closing dialog
        this.dialogRef.close();
    }

    public select_label( label: string ): void {

        if( this.createdLabelsSet.has(label) ){
            this.createdLabelsSet.delete( label );
        } else {
            this.createdLabelsSet.add( label );
        }

    }


}