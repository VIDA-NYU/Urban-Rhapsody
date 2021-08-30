import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DataLoaderDialogComponent } from "./loaders/data-loader-dialog/data-loader-dialog.component";
import { SonycLoaderDialogComponent } from "./loaders/sonyc-loader-dialog/sonyc-loader-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class DialogManager {

    constructor( public dialog: MatDialog ){}

    public openDialog( dialogName: string, params?: {} ){

        switch( dialogName ){
            case 'data-loader-dialog': this.openDataLoaderDialog(); break;
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

}