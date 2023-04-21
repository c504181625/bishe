import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',component: MainComponent,
    children: [
      {path:'',redirectTo:'left',pathMatch:'full'},
      {
        path: 'left',
        loadChildren: () =>import('./left/left.module').then((m) => m.LeftModule),
      },
      {
        path: 'center',
        loadChildren: () =>import('./center/center.module').then((m) => m.CenterModule),
      },
      {
        path: 'right',
        loadChildren: () =>import('./right/right.module').then((m) => m.RightModule),
      },
      // {path:'left',component:LeftComponent},
      // {path:'center',component:CenterComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
