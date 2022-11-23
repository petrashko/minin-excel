import { $ } from '@core/dom.js';

function resizeHandler($root, event) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value = 0;

    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    });

    document.onmousemove = (ev) => {
        if (type === 'col') {
            const delta = ev.pageX - (coords.x + coords.width);
            value = coords.width + delta;
            $resizer.css({
                right: -delta + 'px'
            });
        }
        else if (type === 'row') {
            const delta = ev.pageY - (coords.y + coords.height);
            value = coords.height + delta;
            $resizer.css({
                bottom: -delta + 'px'
            });
        }
    }

    document.onmouseup = (ev) => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (type === 'col') {
            $parent.css({
                width: value + 'px'
            });
            $root
                .findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(el => el.style.width = value + 'px');
        }
        else if (type === 'row') {
            $parent.css({
                height: value + 'px'
            });
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        });
    }
}

export {
    resizeHandler
}
