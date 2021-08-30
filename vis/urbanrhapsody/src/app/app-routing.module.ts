import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewViewComponent } from './views/overview-view/overview-view.component';

const routes: Routes = [
  {path: '', component: OverviewViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
