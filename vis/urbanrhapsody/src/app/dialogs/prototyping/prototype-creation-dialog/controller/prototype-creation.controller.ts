import { FormControl, FormGroup } from "@angular/forms";
import { LabelingAPI } from "src/app/api/labeling.api";

export class PrototypeCreationController {  

    // input label
    public prototypeForm = new FormGroup({prototypeName: new FormControl()});

    // all labels in the database
    public createdLabels: string[] = [];    
    public createdLabelsSet: Set<string> = new Set<string>();

    constructor(){}

    public async initialize_component(): Promise<void> {

        const response: { labels: string[] } = await LabelingAPI.get_all_labels();
        this.createdLabels = response.labels;

    }

    public async create_prototype(): Promise<void>{

        await LabelingAPI.create_prototype( this.prototypeForm.value.prototypeName, Array.from(this.createdLabelsSet.values()) )

    }

    public select_label( label: string ): void {

        if( this.createdLabelsSet.has(label) ){
            this.createdLabelsSet.delete( label );
        } else {
            this.createdLabelsSet.add( label );
        }

    }


}