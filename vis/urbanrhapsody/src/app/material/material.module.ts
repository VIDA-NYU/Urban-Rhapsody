// core
import { NgModule } from '@angular/core';

// material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule }  from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

// holds all necessary modules
const MATERIAL_MODULES = [
    MatToolbarModule,   MatIconModule,
    MatButtonModule,    MatMenuModule,
    MatDialogModule,    MatSidenavModule,
    MatDividerModule,   MatFormFieldModule,
    MatInputModule,     MatProgressSpinnerModule,
    MatSliderModule,    MatSelectModule,
    MatTabsModule,      MatChipsModule,
    MatPaginatorModule, MatCheckboxModule,
    MatListModule,      MatTableModule,
    MatTooltipModule,   MatCardModule

];

@NgModule({

    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES

})

export class MaterialModule {}