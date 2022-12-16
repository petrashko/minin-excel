// @core: см. файл 'webpack.config.js' раздел 'resolve'
import { DomListener } from '@core/DomListener.js';

class ExcelComponent extends DomListener {
    //
    constructor($root, options = {}) {
        super($root, options.listeners);
        //
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.unsubList = [];
        //
        this.store = options.store;
        // Массив строк - ключей state'a, на которые подписан компонент
        this.subscribe = options.subscribe || [];
        //
        this.prepare();
    }

    // Настраивает компонент до init
    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return '';
    }

    // Работа с Emitter

    // Компонент тригерить кастомное событие
    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args);
    }

    // Компонент подписывается на кастомное событие
    $on(eventName, func) {
        const unsub = this.emitter.subsribe(eventName, func);
        this.unsubList.push(unsub);
    }

    // Работа со store

    //
    $dispatch(action) {
        this.store.dispatch(action);
    }

    // В метод приходят только изменения по тем ключам (массив this.subscribe)
    // в store, на которые компонент подписался
    storeChanged(changes) {}

    //
    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // Инициализация компонента
    init() {
        this.initDOMListeners();
    }

    // Удаление компонента
    destroy() {
        this.removeDOMListeners();
        //
        this.unsubList.forEach(unsub => unsub());
    }
}

export { ExcelComponent }
