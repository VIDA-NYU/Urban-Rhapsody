import { MatDialogRef } from "@angular/material/dialog";
import { LearnAPI } from "src/app/api/learn.api";
import { GlobalEvents } from "src/app/events/global.events";
import { PrototypeState } from "src/app/state/prototype/prototype.state";
import { PrototypeSelectionDialogComponent } from "../prototype-selection-dialog.component";

export class PrototypeSelectionController {

    public availablePrototypes: string[] = [];

    constructor( public dialogRef: MatDialogRef<PrototypeSelectionDialogComponent>, public prototypeState: PrototypeState, public globalEvents: GlobalEvents ){}

    public async initialize_controller(): Promise<void> {

        const availablePrototypes: { [responseType: string]: string[] } = await LearnAPI.get_all_prototypes();
        this.availablePrototypes = availablePrototypes.prototypes;

    }

    public async apply_prototype( prototypeName: string ): Promise<void> {

        // calculating prototype
        await this.prototypeState.apply_prototype( prototypeName );

        // emitting prototype event
        this.globalEvents.prototypeApplied.emit();

        // closing dialog
        this.dialogRef.close();

    }
    
}