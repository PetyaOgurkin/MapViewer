

const URL = "http://gis.krasn.ru/ogc?mguid=aba84169716734ec5a8f822fe877e60b_1591275149&id=7c4fd300-0a9e-87d6-8f6e-444c2b24812f&key=akj7517rj9gdduuj&";

/* async function getLayer() {

    const parser = new ol.format.WMSCapabilities();
    const capabilities = URL + "SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities";
    const result = parser.read(await fetch(capabilities).then(res => res.text()));

    const tmp = {
        layersName: result.Capability.Layer.Layer.map(layer => layer.Name).reverse(),
        layersTitle: result.Capability.Layer.Layer.map(layer => layer.Title).reverse(),
    }

    console.log(tmp);

}




getLayer().then(Response => {
    console.log(Response);

}) */

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
zoom = 2;





const tiled_url = 'http://monitor.krasn.ru/tiles/topo/{z}/{x}/{-y}.png';
const lvls = 17;


const startResolution = 19567.87923828125;
const resolutions = [];
for (let i = 0; i < lvls; i++) {
    resolutions.push(startResolution / Math.pow(2, i));
}

tiled = [
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




