import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CenterRoutingModule } from './center-routing.module';
import { CenterComponent } from './center.component';


@NgModule({
  declarations: [
    CenterComponent
  ],
  imports: [
    CommonModule,
    CenterRoutingModule
  ]
})
export class CenterModule { }
