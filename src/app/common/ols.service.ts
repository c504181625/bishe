import { Injectable } from '@angular/core';
import { Map, View, Feature } from 'ol';
import { Group as TileGroup, Heatmap, Tile, Tile as TileLayer } from 'ol/layer';
import { Vector as VertorSource, Stamen, XYZ, Vector } from 'ol/source';
import { WindLayer } from 'ol-wind';
import { Heatmap as HeatmapLayer } from 'ol/layer.js';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import gfs from '../../assets/lib/gfs.json';
import geo from '../../assets/lib/geo.json';
import heatD from '../../assets/lib/heatData.json';
import rain24 from '../../assets/lib/Rain24.json';
import GeoJSON from 'ol/format/GeoJSON.js';

import {
  defaults,
  ScaleLine,
  FullScreen,
  ZoomToExtent,
  OverviewMap,
  MousePosition,
  ZoomSlider,
} from 'ol/control'; // import * as olControls from 'ol/control
import LayerTile from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import { LineString, MultiPolygon, Point, Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  Projection,
  fromLonLat,
  getTransform,
  transform,
  transformExtent,
} from 'ol/proj';
import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';
import CircleStyle from 'ol/style/Circle';

@Injectable({
  providedIn: 'root',
})
export class OlsService {
  constructor(private http: HttpClient) {}
  public map: any;
  public windLayer: any;
  getOlMap() {
    //比例尺
    const scaleLineControl = new ScaleLine({
      //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
      units: 'metric',
      // bar:true
    });
    const TiandiMap_vec = new Tile({
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=95f533461c8247b5d03a3e131a05483d',
      }),
    });
    const TiandiMap_cva = new Tile({
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=95f533461c8247b5d03a3e131a05483d',
      }),
      zIndex: 333,
    });
    const map = new Map({
      target: 'echart04',
      //@ts-ignore
      layers: [TiandiMap_vec, TiandiMap_cva],
      view: new View({
        center: [116.316693, 40.118692],
        zoom: 8,
        maxZoom: 11,
        minZoom: 1,
        projection: 'EPSG:4326',
      }),
      controls: defaults().extend([scaleLineControl]),
    });
    // 设置区域
    let features: any = [];
    geo.features.forEach((g: any) => {
      let lineData = g.geometry;
      let routeFeature: any = '';

      if (lineData.type === 'MultiPolygon') {
        routeFeature = new Feature({
          geometry: new MultiPolygon(lineData.coordinates),
        });
      } else if (lineData.type === 'Polygon') {
        routeFeature = new Feature({
          geometry: new Polygon(lineData.coordinates),
        });
      }
      routeFeature.setStyle(
        new Style({
          fill: new Fill({
            color: '#4e98f444', //填充颜色
          }),
          stroke: new Stroke({
            width: 1, //边界宽度
            color: [71, 137, 227, 1], //边界颜色
          }),
        })
      );
      features.push(routeFeature);
    });
    // 设置图层
    let routeLayer = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
    });
    map.addLayer(routeLayer);
    this.map = map;
  }
  //风场
  getWindMap(windcli: any) {
    // console.log(windcli + '111');
    const windLayer = new WindLayer(gfs, {
      foceRender: false,
      windOptions: {
        globalAlpha: 0.9, // 粒子透明度
        maxAge: 40, // 存活最大帧数
        velocityScale: 1 / 50000, // 粒子速度
        frameRate: 20, // 每50贞绘制一次
        paths: 8000, // 粒子数量
        colorScale: () => {
          return '#bb3e18';
        },
        width: 3000,
      },
    });
    this.addMap(windcli, windLayer, 'wind-layer');
  }
  //行政区划
  getDivision(cityValue: any) {
    // 设置区域
    let features: any = [];
    geo.features.forEach((g: any) => {
      let lineData = g.geometry;
      let nameData = g.properties.name;
      let routeFeature: any = '';
      if (lineData.type === 'MultiPolygon') {
        routeFeature = new Feature({
          geometry: new MultiPolygon(lineData.coordinates),
        });
      } else if (lineData.type === 'Polygon') {
        routeFeature = new Feature({
          geometry: new Polygon(lineData.coordinates),
        });
      }
      switch (nameData) {
        case '东城区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#1c677e', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '西城区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#bd1313', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '朝阳区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#6213bd', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '丰台区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#bd1313', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '石景山区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#6246df', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '海淀区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#1f7eeb', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '门头沟区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#43b4e9', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '房山区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#26dfa1', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '通州区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#9fd61e', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '顺义区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#16e420', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '昌平区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#d3d61e', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '大兴区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#6c1ee9', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '怀柔区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#5cc7e7', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '平谷区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#dfd760', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '密云区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#df6060', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
        case '延庆区':
          routeFeature.setStyle(
            new Style({
              fill: new Fill({
                color: '#dfa460', //填充颜色
              }),
              stroke: new Stroke({
                width: 1, //边界宽度
                color: [71, 137, 227, 1], //边界颜色
              }),
            })
          );
          break;
      }
      features.push(routeFeature);
    });
    // 设置图层
    let routeLayer = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
      className: 'Division',
    });
    this.addMap(cityValue, routeLayer, 'Division');
  }
  // 添加图层
  addMap(value: any, layerName: any, className: any) {
    switch (value) {
      case false:
        this.map.addLayer(layerName);
        console.log(this.map.getLayers().array_);
        break;
      case true:
        let maps = this.map.getLayers().array_;
        let index = maps.findIndex((map: any) => map.className_ === className);
        this.map.removeLayer(maps[index]);
        console.log(this.map.getLayers().array_);
        break;
    }
  }
  getHeatMap(tempcli: any) {
    let heatfeatures: any = [];
    let routeFeature: any = '';
    heatD.features.forEach((g: any) => {
      let lineData = g.geometry.coordinates;
      routeFeature = new Feature({
        geometry: new Point(lineData),
      });
      let pressures = g.geometry.prope;
      let color = 'rgba(0, 0, 255, 1)';
      if (pressures > 1013) {
        color = 'rgba(255, 0, 0, 1)';
      } else if (pressures > 1012) {
        color = 'rgba(255, 255, 0, 1)';
      }
      routeFeature.setStyle(
        new Style({
          fill: new Fill({
            color: color, //填充颜色
          }),
        })
      );
      heatfeatures.push(routeFeature);
    });
    let heatMapLayer = new HeatmapLayer({
      source: new VectorSource({
        features: heatfeatures,
      }),
      className: 'heatmap',
      blur: 10,
      radius: 10,
    });
    this.addMap(tempcli, heatMapLayer, 'heatmap');
  }
  getCloudMap(cloudcli: any) {
    var cloudLayer = new ImageLayer({
      source: new Static({
        url: '../../assets/imgs/云图.png', // 这里填上对应的图片地址即可
        projection: 'EPSG:3857',
        // [[-10.787277369124666, 62.8820698883665], [56.385845314127209, 161.69675114151386]]
        imageExtent: transformExtent(
          [
            62.8820698883665, -10.787277369124666, 161.69675114151386,
            56.385845314127209,
          ],
          'EPSG:4326',
          'EPSG:3857'
        ), // [minx, miny, maxx, maxy] 即对象坐标
      }),
      className: 'cloudLayer',
    });
    console.log(cloudLayer);
    this.addMap(cloudcli, cloudLayer, 'cloudLayer');
  }
  getPreMap(precli: any) {
    // 导入中国地图数据
    // const preSource = new VectorSource({
    //   format: new GeoJSON(),
    //   url: '/assets/china.geojson',
    // });
    // const preMapLayer = new VectorLayer({
    //   source: preSource,
    // });
    // const styleFunction = function (feature: any) {
    //   const value = feature.get('value');
    //   const color = value > 100 ? 'red' : value > 50 ? 'orange' : 'yellow';
    //   return new Style({
    //     fill: new Fill({
    //       color: color,
    //     }),
    //     stroke: new Stroke({
    //       color: 'black',
    //       width: 1,
    //     }),
    //   });
    // };
    // preMapLayer.setStyle(styleFunction);
  }
  rainVector: any;
  rainFeatures: any = [];
  getRainMap(raincli: any) {
    this.rainVector = new VectorLayer({
      source: new VectorSource({
        features: this.rainFeatures,
      }),
      style: new Style({
        image: new Circle({
          fill: new Fill({
            color: 'rgba(255, 0, 0, 0.4)',
          }),
          stroke: new Stroke({
            color: 'red',
            width: 1,
          }),
          radius: 10,
        }),
      }),
      className: 'RainMap',
    });
    this.loadRainData();
    this.addMap(raincli, this.rainVector, 'RainMap');
  }
  loadRainData() {
    const url =
      'https://typhoon.slt.zj.gov.cn/Api/LeastRain/24?callback=JSONP_CALLBACK';

    this.http.jsonp(url, 'JSONP_CALLBACK').subscribe((data: any) => {
      let datass: any = [];
      datass.push(data);
      let colorDatas: any = [];
      let zbData: any = [];

      if (datass) {
        datass.forEach((ra: any) => {
          const rainData = JSON.parse(ra.contours);
          for (let i = 0; i < rainData.length; i++) {
            // colorDatas = rainData[i].color.split(',');
            colorDatas.push(rainData[i].color.split(','));
            zbData.push(rainData[i].latAndLong);
          }
          console.log(zbData);
          console.log(colorDatas);

          let colors: any = [];
          const coordss: any = [];
          for (let i = 0; i < zbData.length; i++) {
            const coord: any = [];
            for (let j = 0; j < zbData[i].length; j++) {
              const latLng = zbData[i][j];
              // console.log(latLng);
              // const latLngs = latLng.split(',');
              coord.push([latLng[1], latLng[0]]);
            }
            coordss.push(coord);
          }
          console.log(coordss);
          let rainPolygon = new Polygon([coordss]);
          rainPolygon.applyTransform(getTransform('EPSG:4326', 'EPSG:3857'));
          console.log(rainPolygon);

          const feature = new Feature({
            geometry: rainPolygon,
            value: 10,
            fill: new Fill({
              color: colors,
            }),
            stroke: new Stroke({ color: 'black', width: 1 }),
          });
          console.log(feature);

          this.rainFeatures.push(feature);
        });
      }
    });
  }
}
