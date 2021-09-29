import { Component, OnInit } from '@angular/core';
import { DialogManager } from 'src/app/dialogs/dialog-manager.service';
import { DataState } from 'src/app/state/data.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor( public dialogManager: DialogManager, public dataState: DataState ) { }

  ngOnInit(): void {}


  public open_dialog( dialogName: string ): void {

    this.dialogManager.openDialog( dialogName )

  }

}
