import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RightComponent } from './right.component';

const routes: Routes = [{
  path:'',component:RightComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RightRoutingModule { }
