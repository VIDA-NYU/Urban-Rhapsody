import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FrameLabelingDialogComponent } from "./labeling/frame-labeling-dialog/frame-labeling-dialog.component";
import { DataLoaderDialogComponent } from "./loaders/data-loader-dialog/data-loader-dialog.component";
import { UmapProjectionDialogComponent } from "./projections/umap-projection-dialog/umap-projection-dialog.component";
import { PrototypeCreationDialogComponent } from "./prototyping/prototype-creation-dialog/prototype-creation-dialog.component";
import { PrototypeSelectionDialogComponent } from "./prototyping/prototype-selection-dialog/prototype-selection-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class DialogManager {

    constructor( public dialog: MatDialog ){}

    public openDialog( dialogName: string, params?: {} ){

        switch( dialogName ){
            case 'data-loader-dialog': this.openDataLoaderDialog(); break;
            case 'umap-projection-dialog': this.openUMAPProjectionDialog(); break;
            case 'frame-labeling-dialog': this.openFrameLabelingDialog(); break;
            case 'prototype-creation-dialog': this.openPrototypeCreationDialog(); break;
            case 'prototype-selection-dialog': this.openPrototypeSelectionDialog(); break;
        }
    
    }


    // private methods
    private openPrototypeSelectionDialog( params?: any ): void {

        this.dialog.open( PrototypeSelectionDialogComponent, {
            panelClass: 'custom-dialog-container',
            width: '800px',
            height: '400px'
        })

    }

    private openPrototypeCreationDialog( params?: any ): void {

        this.dialog.open( PrototypeCreationDialogComponent, {
            panelClass: 'custom-dialog-container',
            width: '800px',
            height: '400px'
        })

    }

    private openFrameLabelingDialog( params?: any ): void {

        this.dialog.open( FrameLabelingDialogComponent, {
            panelClass: 'custom-dialog-container',
            width: '800px',
            height: '400px'
        });

    }

    private openDataLoaderDialog( params?: any ): void {
        this.dialog.open( DataLoaderDialogComponent, {
            panelClass: 'custom-dialog-container',
            width: '800px',
            height: '800px'
        });
    } 

    // projection dialogs
    private openUMAPProjectionDialog( params?: any ): void {
        this.dialog.open( UmapProjectionDialogComponent, {
            panelClass: 'custom-dialog-container',
            width: '800px',
            height: '800px'
        });
    } 

}