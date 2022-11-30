// @core: см. файл 'webpack.config.js' раздел 'resolve'
import { DomListener } from '@core/DomListener.js';

class ExcelComponent extends DomListener {
    //
    constructor($root, options = {}) {
        super($root, options.listeners);
        //
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.unsubscribers = [];
        //
        this.prepare();
    }

    // Настраивает компонент до init
    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }

    // Компонент тригерить кастомное событие
    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args);
    }

    // Компонент подписывается на кастомное событие
    $on(eventName, fn) {
        const unsub = this.emitter.subsribe(eventName, fn);
        this.unsubscribers.push(unsub);
    }

    // Инициализация компонента
    init() {
        this.initDOMListeners();
    }

    // Удаление компонента
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
    }
}

export { ExcelComponent }
