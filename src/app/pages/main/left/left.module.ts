import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftRoutingModule } from './left-routing.module';
import { LeftComponent } from './left.component';
import { SHARED_ZORRO_MODULES } from 'src/app/common/common-antd/common-antd.module';
import { HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  declarations: [LeftComponent],
  imports: [
    CommonModule,
    LeftRoutingModule,
    SHARED_ZORRO_MODULES,
    HttpClientJsonpModule,
  ],
})
export class LeftModule {}
