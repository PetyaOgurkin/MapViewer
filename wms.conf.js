const tiles = {
    topo: {
        URL: 'http://monitor.krasn.ru/tiles/topo/{z}/{x}/{-y}.png',
        resolution_levels: 17
    },
    sentinel: {
        URL: 'http://monitor.krasn.ru/tiles/sentinel2016/{z}/{x}/{-y}.jpeg',
        resolution_levels: 12
    },
    relief_dark: {
        URL: 'http://monitor.krasn.ru/tiles/relief_dark/{z}/{x}/{-y}.jpeg',
        resolution_levels: 13
    }
}

const layers = {
    GFS: {
        URL: 'http://gis.krasn.ru/mserver/ogc.php?id=7c4fd300-0a9e-87d6-8f6e-444c2b24812f&key=akj7517rj9gdduuj&p1=2020-05&p3=2020051006',
        id: '7c4fd300-0a9e-87d6-8f6e444c2b24812f',
        key: 'akj7517rj9gdduuj',
        onMap: false
    },
    GPM: {
        URL: 'http://gis.krasn.ru/mserver/ogc.php?id=e2cb3bf9-5c11-ef70-90c6-563045a12e99&key=akj7737z2a5rmeyz&p1=2020-06&p3=20200622',
        id: 'e2cb3bf9-5c11-ef70-90c6-563045a12e99',
        key: 'akj7737z2a5rmeyz',
        onMap: false
    }
}

export { tiles, layers }