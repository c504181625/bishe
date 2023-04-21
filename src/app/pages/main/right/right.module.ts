import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightRoutingModule } from './right-routing.module';
import { RightComponent } from './right.component';
import { SHARED_ZORRO_MODULES } from 'src/app/common/common-antd/common-antd.module';

@NgModule({
  declarations: [RightComponent],
  imports: [CommonModule, RightRoutingModule, SHARED_ZORRO_MODULES],
})
export class RightModule {}
