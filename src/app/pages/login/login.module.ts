import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SHARED_ZORRO_MODULES } from 'src/app/common/common-antd/common-antd.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SHARED_ZORRO_MODULES
  ]
})
export class LoginModule { }
