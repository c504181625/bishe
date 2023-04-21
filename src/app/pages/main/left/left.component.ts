import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { OlsService } from 'src/app/common/ols.service';

// import { MapLeftService } from '../../servise/map-left.service';
// import { EchartsServiseService } from '../../servise/echarts-servise.service';

interface RES {
  code: number;
  now: object;
  daily: object;
  hourly: object;
}

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftComponent implements OnInit {
  todayAirData: any = {};
  todayWarData: any = {};
  todayWerthData: any = {};
  TodayWetherData: any = {};
  TodayWetherTempData: any = [];
  TodayWetherHumiditypData: any = [];
  TodayWetherTimeData: any = [];
  sunData = [
    297, 321, 336, 375, 369, 294, 243, 208, 183, 154, 126, 96, 94, 86, 80, 85,
    86, 99, 112, 113, 193, 204, 216, 251,
  ];
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router,
    private ol: OlsService,
    private changeDetectorRef: ChangeDetectorRef // private map:MapLeftService // private echartsServise: EchartsServiseService
  ) {}

  ngOnInit(): void {
    this.getAirNum();
    // this.ngAfterViewInit();
    this.getTemNum();
    this.getWethNum();
    this.getTodayWethNum();
    this.ol.getOlMap();
  }
  windValue = false;
  rainValue = false;
  tempValue = false;
  cloudValue = false;
  cityValue = false;
  preValue = false;
  windCli(e: any): void {
    this.windValue = e;
    this.ol.getWindMap(this.windValue);
  }
  cityCli(e: any): void {
    this.cityValue = e;
    this.ol.getDivision(this.cityValue);
  }
  tempCli(e: any): void {
    this.tempValue = e;
    this.ol.getHeatMap(this.tempValue);
  }
  cloudCli(e: any): void {
    this.cloudValue = e;
    this.ol.getCloudMap(this.cloudValue);
  }
  preCli(e: any): void {
    this.preValue = e;
    this.ol.getPreMap(this.preValue);
  }
  rainCli(e: any): void {
    this.rainValue = e;
    this.ol.getRainMap(this.rainValue);
  }
  //空气质量
  getAirNum() {
    this.http
      .get<RES>(
        'https://devapi.qweather.com/v7/air/now?location=101010100&key=e8792f68fc9c49979588a89b1c9d5eda'
      )
      .subscribe((res) => {
        if (res['code'] != 200) {
          this.message.warning('请求失败');
          // this.router.navigateByUrl('not-found');
        } else {
          // this.todayAirData=JSON.parse(JSON.stringify(res.now));
          this.todayAirData = res.now;
          // console.log(this.todayAirData);
          this.initChart01();
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  initChart01() {
    var chartDom01 = document.getElementById('e01') as HTMLElement;
    var myChart1 = echarts.init(chartDom01);
    var options;

    options = {
      title: {
        text: '实时空气质量',
        // subtext: '空气污染物含量',
        left: '22%',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        top: '30%',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          center: ['50%', '60%'],
          radius: '60%',
          data: [
            // { value: this.todayAirData.aqi, name: 'aqi' },
            { value: this.todayAirData.co, name: 'co' },
            { value: this.todayAirData.no2, name: 'no2' },
            { value: this.todayAirData.o3, name: 'o3' },
            { value: this.todayAirData.pm2p5, name: 'pm2p5' },
            { value: this.todayAirData.pm10, name: 'pm10' },
            // { value: this.todayAirData.primary, name: 'primary' },
            { value: this.todayAirData.so2, name: 'so2' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    options && myChart1.setOption(options);
    //echarts自适应
    window.onresize = function () {
      myChart1.resize();
    };
  }
  //bottom
  getTemNum() {
    this.http
      .get<RES>(
        'https://devapi.qweather.com/v7/weather/now?location=101010100&key=e8792f68fc9c49979588a89b1c9d5eda'
      )
      .subscribe((res) => {
        if (res['code'] != 200) {
          this.message.warning('请求失败');
          // this.router.navigateByUrl('not-found');
        } else {
          this.todayWarData = res.now;
          this.initChart02();
          // console.log(this.todayWarData);

          // this.changeDetectorRef.markForCheck();
          // this.changeDetectorRef.detectChanges();
        }
      });
  }
  //建议
  getWethNum() {
    this.http
      .get<RES>(
        'https://devapi.qweather.com/v7/indices/1d?type=1,2&location=101010100&key=e8792f68fc9c49979588a89b1c9d5eda'
      )
      .subscribe((res) => {
        if (res['code'] != 200) {
          this.message.warning('请求失败');
          // this.router.navigateByUrl('not-found');
        } else {
          this.todayWerthData = res.daily;
          // console.log(this.todayWerthData);

          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        }
      });
  }
  initChart02() {
    var chartDom = document.getElementById('e02') as HTMLElement;
    var myChart2 = echarts.init(chartDom);
    var option;
    option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'temperature',
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          progress: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}°C',
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          data: [
            {
              value: this.todayWarData.temp,
            },
          ],
        },
      ],
    };
    option && myChart2.setOption(option);
    //echarts自适应
    window.onresize = function () {
      myChart2.resize();
    };
  }
  //24h
  getTodayWethNum() {
    this.http
      .get<RES>(
        'https://devapi.qweather.com/v7/weather/24h?location=101010100&key=e8792f68fc9c49979588a89b1c9d5eda'
      )
      .subscribe((res) => {
        if (res['code'] != 200) {
          this.message.warning('请求失败');
          // this.router.navigateByUrl('not-found');
        } else {
          this.TodayWetherData = res.hourly;
          for (let i = 0; i < 24; i++) {
            this.TodayWetherTempData.push(this.TodayWetherData[i].temp);
            this.TodayWetherHumiditypData.push(
              this.TodayWetherData[i].humidity
            );
          }
          // console.log(this.TodayWetherData);
          // console.log(this.TodayWetherHumiditypData);
          this.initChart03();
          // this.Esri.getEsri()
          // this.Esri.getbeij()
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        }
      });
  }
  initChart03() {
    var chartDom3 = document.getElementById('echart03') as HTMLElement;
    var myChart3 = echarts.init(chartDom3);
    var option;

    // Generate data
    let category = [];
    let date = new Date();
    let dateHour = date.getHours();

    for (let i = 0; i < 24; i++) {
      let dateHours = dateHour++;
      if (dateHour + 1 < 26) {
        category.push([date.getDate(), dateHours].join('-'));
      } else {
        category.push([date.getDate() + 1, dateHours - 24].join('-'));
      }
    }
    option = {
      backgroundColor: '#0f375f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['24小时气温', '24小时相对湿度', '太阳辐射'],
        textStyle: {
          color: '#ccc',
        },
      },
      xAxis: {
        data: category,
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
      },
      yAxis: [
        {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        {
          type: 'value',
          name: '温度',
          position: 'right',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#91CC75',
            },
          },
          axisLabel: {
            formatter: '{value} °C',
          },
        },
        {
          type: 'value',
          name: '太阳辐射',
          position: 'left',
          alignTicks: true,
          offset: 80,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#9370DB',
            },
          },
          axisLabel: {
            formatter: '{value} cal/cm2',
          },
        },
      ],
      series: [
        {
          name: '太阳辐射',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          yAxisIndex: 2,
          data: this.sunData,
        },
        {
          name: '24小时气温',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          yAxisIndex: 1,
          data: this.TodayWetherTempData,
        },
        {
          name: '24小时相对湿度',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#14c8d4' },
              { offset: 1, color: '#43eec6' },
            ]),
          },
          data: this.TodayWetherHumiditypData,
        },
      ],
    };

    option && myChart3.setOption(option);
    // echarts自适应
    window.onresize = function () {
      myChart3.resize();
    };
  }
}
