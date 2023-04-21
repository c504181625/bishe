import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OlsService } from 'src/app/common/ols.service';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.less'],
})
export class RightComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) // private ol: OlsService
  {}
  ngOnInit(): void {
    // this.ol.getOlMap();
  }
}
