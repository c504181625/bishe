import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeftComponent } from './left.component';

const routes: Routes = [
  {
    path:'',component:LeftComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeftRoutingModule { }
