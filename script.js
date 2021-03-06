

const URL = "http://gis.krasn.ru/ogc?mguid=aba84169716734ec5a8f822fe877e60b_1591275149&id=7c4fd300-0a9e-87d6-8f6e-444c2b24812f&key=akj7517rj9gdduuj&";


const PROJECTION_CODE = "EPSG:3576"



proj4.defs("EPSG:3576", "+proj=laea +lat_0=90 +lon_0=0 +x_0=90 +y_0=0 +datum=WGS84 +units=m +no_defs");
ol.proj.proj4.register(proj4);

extent = [-4859377.085, -7109342.085, 5159377.085, 2909412.085]
projection = new ol.proj.Projection({
    code: PROJECTION_CODE,
    extent,
    global: false,
    units: 'm'
});
center = [0, -24e5];
zoom = 1;





const tiled_url = 'http://monitor.krasn.ru/tiles/topo/{z}/{x}/{-y}.png';
const lvls = 17;


const startResolution = 19567.87923828125;
const resolutions = [];
for (let i = 0; i < lvls; i++) {
    resolutions.push(startResolution / Math.pow(2, i));
}

const tiled = [
    new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: tiled_url,
            projection,
            tileGrid: new ol.tilegrid.TileGrid({
                extent,
                resolutions,
                origin: ol.extent.getTopLeft(extent)
            })
        })
    }),
    new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url: URL,
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
            url: 'http://gis.krasn.ru/mserver/ogc.php?id=e2cb3bf9-5c11-ef70-90c6-563045a12e99&key=akj7737z2a5rmeyz&',
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

const map = new ol.Map({
    layers: tiled,
    target: 'map',
    view: new ol.View({
        center,
        zoom,
        projection,
        extent
    }),
    controls: ol.control.defaults().extend([new ol.control.ScaleLine()])
});

/* const legend = document.querySelector('#legend');

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



map.on('singleclick', function (evt) {
    document.getElementById('info').innerHTML = '';
    var viewResolution = map.getView().getResolution();
    var url = tiled[2].getSource().getFeatureInfoUrl(
        evt.coordinate,
        viewResolution,
        PROJECTION_CODE,
        { 'INFO_FORMAT': 'text/html' }
    );

    if (url) {
        fetch(url)
            .then(function (response) { return response.text(); })
            .then(function (html) {
                document.getElementById('info').innerHTML = html;
            });
    }
});

 */