export default class MapMath {

    static extent = {
        EPSG3576: [-4859377.085, -7109342.085, 5159377.085, 2909412.085]
    }

    static getResolution(resolution_levels) {
        const startResolution = 19567.87923828125;
        const resolutions = [];
        for (let i = 0; i < resolution_levels; i++) {
            resolutions.push(startResolution / 2 ** i);
        }
        return resolutions
    }
}