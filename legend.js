import { map } from './map.js'

let state = []
document.querySelector('#list').querySelectorAll('.drg').forEach(e => {
    state.push(e.id)
});

$("#list").sortable();
$("#list").disableSelection();
$("#list").on("sortstop", function () {
    setTimeout(() => {
        const list = document.querySelector('#list').querySelectorAll('.drg')

        for (let i = 0; i < list.length; i++) {
            if (state[i] !== list[i].id) {
                state = [];
                list.forEach(e => state.push(e.id))

                map.getLayers().forEach(layer => {
                    const layerId = layer.getProperties().id;

                    if (layerId) {
                        const zindex = state.findIndex(e => e === layerId);

                        layer.setZIndex(zindex);
                    }
                })
                break;
            }
        }
    }, 0)
});

/* const resize = document.querySelector('#resize');

resize.addEventListener('click', function () {
    this.parentElement.classList.toggle('open');
}) */