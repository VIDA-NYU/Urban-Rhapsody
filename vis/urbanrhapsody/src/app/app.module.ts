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
    CalendarTimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ DataLoaderDialogComponent, SonycLoaderDialogComponent ]
})
export class AppModule { }
