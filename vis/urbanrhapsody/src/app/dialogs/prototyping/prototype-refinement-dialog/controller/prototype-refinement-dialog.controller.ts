import { MatDialogRef } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { LearnAPI } from "src/app/api/learn.api";
import { LabelingState } from "src/app/state/labeling/labeling.state";
import { PrototypeState } from "src/app/state/prototype/prototype.state";
import { PrototypeRefinementDialogComponent } from "../prototype-refinement-dialog.component";

export class PrototypeRefinementDialogController {

    // dialog ref
    public dialogRef!: MatDialogRef<PrototypeRefinementDialogComponent>;

    // loading spinner flag
    public refinePrototypeLoading: boolean = false;

    // selected prototype
    public selectedPrototype: string = '';

    // all available prototypes
    public availablePrototypes: string[] = [];

    // labels
    public createdLabels: string[] = [];
    public prototypeLabels: Set<string> = new Set<string>();

    constructor(  public prototypeState: PrototypeState, public labelingState: LabelingState ){}

    public async initialize_controller( dialogRef: MatDialogRef<PrototypeRefinementDialogComponent> ): Promise<void> {

        // saving dialog ref
        this.dialogRef = dialogRef;

        // requesting all available prototypes
        const availablePrototypes: { prototypes: string[] } = await this.prototypeState.get_all_prototypes();
        this.availablePrototypes = availablePrototypes.prototypes;

        // requesting all created labels
        const createdLabels: { labels: string[] } = await this.labelingState.get_all_created_labels();
        this.createdLabels = createdLabels.labels;

    }

    public async on_prototype_selected( prototypeName: MatSelectChange ): Promise<void> {

        const prototypeSummary: { name: string, labels: string[], accuracy: number[] } = await LearnAPI.get_prototype_summary( prototypeName.value );
        this.prototypeLabels = new Set<string>(prototypeSummary.labels);

    }

    public on_prototype_label_added( label: string ): void {

        if( this.prototypeLabels.has(label) ){
            this.prototypeLabels.delete(label);
        } else {
            this.prototypeLabels.add(label);
        }

    }

    public async refine_prototype(): Promise<void> {

        // setting spinner flag
        this.refinePrototypeLoading = true; 

        // refining prototype
        await this.prototypeState.refine_prototype( this.selectedPrototype, Array.from(this.prototypeLabels.values()) )

        // setting spinner flag
        this.refinePrototypeLoading = false;

        // closing dialog
        this.dialogRef.close();

    }
}