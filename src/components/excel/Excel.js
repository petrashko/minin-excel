// @core: см. файл 'webpack.config.js' раздел 'resolve'
import * as dispatchActions from '@/redux/actions.js';
import { $ } from '@core/dom.js';
import { Emitter } from '@core/Emitter.js';
import { StoreSubscriber } from '@core/StoreSubscriber.js';

class Excel {
    //
    constructor(options) {
        this.components = options.components || [];
        //
        this.emitter = new Emitter();
        //
        this.store = options.store;
        this.subscriber = new StoreSubscriber(this.store);
    }

    //
    getRoot() {
        const $root = $.create('div', 'excel');

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className);
            //
            const component = new Component($el, componentOptions);
            // // DEBUG
            // if (component.name === 'Formula') {
            //     window['c' + component.name] = component;
            // }
            $el.html( component.toHTML() );
            $root.append($el);

            return component;
        });

        return $root;
    }

    //
    init() {
        this.store.dispatch( dispatchActions.updateDate() );

        this.subscriber.subscribeComponents(this.components);

        this.components.map((component) => {
            component.init();
        });
    }

    //
    destroy() {
        // Отписаться от store'a
        this.subscriber.unsubscribeFromStore();

        this.components.forEach(component => {
            component.destroy();
        });
    }
}

export { Excel }
