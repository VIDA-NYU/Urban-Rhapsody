import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { OverviewViewComponent } from './views/overview-view/overview-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProjectionListComponent } from './components/projections/projection-list/projection-list.component';
import { ProjectionComponent } from './components/projections/projection/projection.component';
import { DataLoaderDialogComponent } from './dialogs/loaders/data-loader-dialog/data-loader-dialog.component';
import { SonycLoaderDialogComponent } from './dialogs/loaders/sonyc-loader-dialog/sonyc-loader-dialog.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { OverviewTimelineComponent } from './components/timeline/overview-timeline/overview-timeline.component';
import { FocusedTimelineComponent } from './components/timeline/focused-timeline/focused-timeline.component';
import { CalendarTimelineComponent } from './components/calendar-timeline/calendar-timeline.component';
import { SimilarityExampleLoaderDialogComponent } from './dialogs/loaders/similarity-example-loader-dialog/similarity-example-loader-dialog.component';
import { SimilarityUploadLoaderDialogComponent } from './dialogs/loaders/similarity-upload-loader-dialog/similarity-upload-loader-dialog.component';
import { SnippetExampleComponent } from './dialogs/loaders/similarity-example-loader-dialog/snippet-example/snippet-example.component';
import { SpectrogramComponent } from './components/media/spectrogram/spectrogram.component';
import { UmapProjectionDialogComponent } from './dialogs/projections/umap-projection-dialog/umap-projection-dialog.component';
import { ProjectionControlsComponent } from './components/projections/projection-controls/projection-controls.component';
import { ProjectionLegendComponent } from './components/projections/projection-legend/projection-legend.component';
import { SpectrogramListComponent } from './components/media/spectrogram-list/spectrogram-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    OverviewViewComponent,
    ToolbarComponent,
    ProjectionListComponent,
    ProjectionComponent,
    DataLoaderDialogComponent,
    SonycLoaderDialogComponent,
    TimelineComponent,
    OverviewTimelineComponent,
    FocusedTimelineComponent,
    CalendarTimelineComponent,
    SimilarityExampleLoaderDialogComponent,
    SimilarityUploadLoaderDialogComponent,
    SnippetExampleComponent,
    SpectrogramComponent,
    UmapProjectionDialogComponent,
    ProjectionControlsComponent,
    ProjectionLegendComponent,
    SpectrogramListComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ DataLoaderDialogComponent, SonycLoaderDialogComponent, UmapProjectionDialogComponent ]
})
export class AppModule { }
