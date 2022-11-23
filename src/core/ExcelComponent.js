// @core: см. файл 'webpack.config.js' раздел 'resolve'
import { DomListener } from '@core/DomListener.js';

class ExcelComponent extends DomListener {
    //
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
    }

    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }

    //
    init() {
        this.initDOMListeners();
    }

    //
    destroy() {
        this.removeDOMListeners();
    }
}

export { ExcelComponent }
