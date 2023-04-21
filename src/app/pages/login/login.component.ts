import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  // checked = true;
  username: string | undefined;
  password: string | undefined;
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      console.log('submit', this.validateForm);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {      
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private http: HttpClient,
    private message: NzMessageService,

  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    });
  }
  isLogin() {
    if(!this.username){
      this.message.warning('用户名不能为空');
      return
    }else if(!this.password){
      this.message.warning('密码不能为空')
    }else if(this.username=='admin' && this.password=='123456'){
      this.router.navigateByUrl('main')
    }else{
      this.message.warning('账号密码错误')
    }
  }
  checked: boolean = false;

  enterPress(e: { keyCode: number }) {
    if (e.keyCode == 13) {
      this.isLogin();
    }
  }
}
