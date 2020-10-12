import MapMath from './mapmath.js';
import * as conf from './wms.conf.js';

const PROJECTION_CODE = "EPSG:3576"

proj4.defs("EPSG:3576", "+proj=laea +lat_0=90 +lon_0=0 +x_0=90 +y_0=0 +datum=WGS84 +units=m +no_defs");
ol.proj.proj4.register(proj4);


const projection = new ol.proj.Projection({
    code: PROJECTION_CODE,
    extent: MapMath.extent.EPSG3576,
    global: false,
    units: 'm'
});


const tiled = [
    new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: conf.tiles.relief_dark.URL,
            projection,
            tileGrid: new ol.tilegrid.TileGrid({
                extent: MapMath.extent.EPSG3576,
                resolutions: MapMath.getResolution(conf.tiles.relief_dark.resolution_levels),
                origin: ol.extent.getTopLeft(MapMath.extent.EPSG3576)
            })
        })
    }),
    new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url: conf.layers.GFS.URL,
            params: {
                'LAYERS': 'region_project',
                'VERSION': '1.1.1',
                'p1': '2020-05',
                'p3': '2020051000'
            },
            ratio: 1,
            projection
        }),
        type: 'WMS_LAYER'
    }),
    new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url: conf.layers.GPM.URL,
            params: {
                'LAYERS': 'region_project',
                'VERSION': '1.1.1',
                'p1': '2020-05',
                'p3': '20200510'
            },
            ratio: 1,
            projection
        }),
        type: 'WMS_LAYER'
    })
]


const view = new ol.View({
    center: [0, -24e5],
    zoom: 1,
    projection,
    extent: MapMath.extent.EPSG3576
})

const map = new ol.Map({
    layers: tiled,
    target: 'map',
    view,
    controls: ol.control.defaults().extend([new ol.control.ScaleLine()])
});


const legend = document.querySelector('#legend');

const legendSrc1 = tiled[2].getSource().getLegendUrl(map.getView().getResolution(), {
    'SYMBOLSPACE': 5,
    'ICONLABELSPACE': 3,
    'LAYERSPACE': 1,
    'LAYERFONTBOLD': false,
    'LAYERTITLE': false,
    'TRANSPARENT': true,
    'SLD_VERSION': '1.1.0'
});


const legendSrc2 = tiled[1].getSource().getLegendUrl(map.getView().getResolution(), {
    'SYMBOLSPACE': 5,
    'ICONLABELSPACE': 3,
    'LAYERSPACE': 1,
    'LAYERFONTBOLD': false,
    'LAYERTITLE': false,
    'TRANSPARENT': true,
    'SLD_VERSION': '1.1.0'
});

legend.innerHTML = `<img src="${legendSrc1}"><img src="${legendSrc2}">`;