import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SHARED_ZORRO_MODULES } from 'src/app/common/common-antd/common-antd.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SHARED_ZORRO_MODULES
  ]
})
export class MainModule { }
