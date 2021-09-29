import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DataLoaderDialogComponent } from "./loaders/data-loader-dialog/data-loader-dialog.component";
import { UmapProjectionDialogComponent } from "./projections/umap-projection-dialog/umap-projection-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class DialogManager {

    constructor( public dialog: MatDialog ){}

    public openDialog( dialogName: string, params?: {} ){

        switch( dialogName ){
            case 'data-loader-dialog': this.openDataLoaderDialog(); break;
            case 'umap-projection-dialog': this.openUMAPProjectionDialog(); break;
        }
    
    }


    // private methods
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