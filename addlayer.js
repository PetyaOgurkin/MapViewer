import { layers } from './wms.conf.js';
import { map, projection } from './map.js'


document.querySelector("#openModal").addEventListener('click', setCollection)

function setCollection() {
    const availableLayers = document.querySelector('#availableLayers');

    availableLayers.innerHTML = ""

    Object.keys(layers).forEach(key => {
        if (!layers[key].onMap) {
            availableLayers.innerHTML += `<div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="${key}">
            <label class="form-check-label" for="${key}">
                ${key}
            </label>
        </div>`
        } else {
            availableLayers.innerHTML += `<div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="${key}" checked="true" disabled>
            <label class="form-check-label" for="${key}">
                ${key}
            </label>
        </div>`
        }
    })
}


document.querySelector('#addLayers').addEventListener('click', () => {
    const availableLayers = document.querySelector('#availableLayers');

    availableLayers.querySelectorAll('input[type=checkbox]').forEach(c => {
        if (c.checked && !c.disabled) {
            layers[c.id].onMap = true;
            document.querySelector('#list').innerHTML += `<li class="drg" id="${c.id}">${c.id} <button id="remove-${c.id}">R</button></li>`;


            const layer = new ol.layer.Image({
                source: new ol.source.ImageWMS({
                    url: layers[c.id].URL,
                    params: {
                        'LAYERS': 'region_project',
                        'VERSION': '1.1.1'
                    },
                    ratio: 1,
                    projection
                }),
                type: 'WMS_LAYER',
                id: c.id
            })
            map.addLayer(layer);

        }
    })

    document.querySelectorAll('[id^=remove]').forEach(e => {
        e.addEventListener('click', () => {
            map.getLayers().forEach(layer =>{
                if(layer.getProperties().id === e.parentNode.id){
                    map.removeLayer(layer)
                }
            })

            layers[e.parentNode.id].onMap = false;
            e.parentNode.remove();
        })
    })
})

