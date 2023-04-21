/**
 * Created by Eric on 2018/3/12.
 * updated by S-jor on 2018/12/01
 */
import {Raster as RasterSource} from 'ol/source';

export default class TileSourceColor {

    constructor(layerParam) {
    }

    static getSource(layer, type) {

        let reverseFunc = undefined
        if (type == 'gray') {
            reverseFunc = function (pixelsTemp) {
                //灰色
                for (var i = 0; i < pixelsTemp.length; i += 4) {
                    var r = pixelsTemp[i];
                    var g = pixelsTemp[i + 1];
                    var b = pixelsTemp[i + 2];
                    //运用图像学公式，设置灰度值
                    var grey = r * 0.3 + g * 0.59 + b * 0.11;
                    //将rgb的值替换为灰度值
                    pixelsTemp[i] = grey;
                    pixelsTemp[i + 1] = grey;
                    pixelsTemp[i + 2] = grey;
                }
            };
        } else if (type == 'blue') {
            reverseFunc = function (pixelsTemp) {
                //蓝色
                for (var i = 0; i < pixelsTemp.length; i += 4) {
                    var r = pixelsTemp[i];
                    var g = pixelsTemp[i + 1];
                    var b = pixelsTemp[i + 2];
                    //运用图像学公式，设置灰度值
                    var grey = r * 0.3 + g * 0.59 + b * 0.11;
                    //将rgb的值替换为灰度值
                    pixelsTemp[i] = grey;
                    pixelsTemp[i + 1] = grey;
                    pixelsTemp[i + 2] = grey;

                    pixelsTemp[i] = 55 - pixelsTemp[i];
                    pixelsTemp[i + 1] = 255 - pixelsTemp[i + 1];
                    pixelsTemp[i + 2] = 305 - pixelsTemp[i + 2];
                }
            };
        } else if (type == 'black') {
            reverseFunc = function (pixelsTemp) {
                //灰色
                for (var i = 0; i < pixelsTemp.length; i += 4) {
                    var r = pixelsTemp[i];
                    var g = pixelsTemp[i + 1];
                    var b = pixelsTemp[i + 2];
                    //运用图像学公式，设置灰度值
                    var grey = r * 0.3 + g * 0.59 + b * 0.11;
                    //将rgb的值替换为灰度值
                    pixelsTemp[i] = grey;
                    pixelsTemp[i + 1] = grey;
                    pixelsTemp[i + 2] = grey;

                    //黑色，依赖上边的灰色
                    pixelsTemp[i] = 255 - pixelsTemp[i];
                    pixelsTemp[i + 1] = 255 - pixelsTemp[i + 1];
                    pixelsTemp[i + 2] = 255 - pixelsTemp[i + 2];
                }
            };
        } else if (type == 'reversal') {
            reverseFunc = function (pixelsTemp) {
                //反转色
                for (var i = 0; i < pixelsTemp.length; i += 4) {
                    pixelsTemp[i] = 255 - pixelsTemp[i];
                    pixelsTemp[i + 1] = 255 - pixelsTemp[i + 1];
                    pixelsTemp[i + 2] = 255 - pixelsTemp[i + 2];
                }
            };
        }

        if (reverseFunc) {
            const raster = new RasterSource({
                sources: [
                    layer,
                ],
                operationType: 'image',
                operation: function (pixels, data) {
                    reverseFunc(pixels[0].data)
                    return pixels[0];
                },
                threads: 10,
                lib: {
                    reverseFunc: reverseFunc,
                }

            });
            // raster.refresh()
            return raster;
        } else {
            return layer;
        }
    }
}
