
// core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';


// components
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
import { FrameLabelingDialogComponent } from './dialogs/labeling/frame-labeling-dialog/frame-labeling-dialog.component';
import { PrototypeCreationDialogComponent } from './dialogs/prototyping/prototype-creation-dialog/prototype-creation-dialog.component';
import { PrototypeSelectionDialogComponent } from './dialogs/prototyping/prototype-selection-dialog/prototype-selection-dialog.component';
import { PrototypeLoaderDialogComponent } from './dialogs/loaders/prototype-loader-dialog/prototype-loader-dialog.component';
import { HistogramComponent } from './components/histogram/histogram.component';
import { SensorMapComponent } from './components/sensor-map/sensor-map.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { FocusedClassificationListComponent } from './components/focused-classification/focused-classification-list/focused-classification-list.component';
import { FocusedClassificationComponent } from './components/focused-classification/focused-classification/focused-classification.component';
import { PrototypeRefinementDialogComponent } from './dialogs/prototyping/prototype-refinement-dialog/prototype-refinement-dialog.component';
import { ClusterTreeComponent } from './components/cluster-tree/cluster-tree.component';
import { ModelSummaryComponent } from './components/model-summary/model-summary.component';
import { ModelSummaryListComponent } from './components/model-summary-list/model-summary-list.component';

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
    SpectrogramListComponent,
    FrameLabelingDialogComponent,
    PrototypeCreationDialogComponent,
    PrototypeSelectionDialogComponent,
    PrototypeLoaderDialogComponent,
    HistogramComponent,
    SensorMapComponent,
    RangeSliderComponent,
    FocusedClassificationListComponent,
    FocusedClassificationComponent,
    PrototypeRefinementDialogComponent,
    ClusterTreeComponent,
    ModelSummaryComponent,
    ModelSummaryListComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ DataLoaderDialogComponent, SonycLoaderDialogComponent, UmapProjectionDialogComponent, FrameLabelingDialogComponent, PrototypeCreationDialogComponent, PrototypeSelectionDialogComponent ]
})
export class AppModule { }
