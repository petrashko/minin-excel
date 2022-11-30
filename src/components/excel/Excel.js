// @core: см. файл 'webpack.config.js' раздел 'resolve'
import { $ } from '@core/dom.js';
import { Emitter } from '@core/Emitter.js';

class Excel {
    //
    constructor(selector, options) {
        //this.$el = document.querySelector(selector);
        this.$el = $(selector);
        this.components = options.components || [];
        //
        this.emitter = new Emitter();
    }

    //
    getRoot() {
        const $root = $.create('div', 'excel');

        const componentOptions = {
            emitter: this.emitter
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
    render() {
        this.$el.append( this.getRoot() );

        this.components.map((component) => {
            component.init();
        });
    }

    //
    destroy() {
        this.components.forEach(component => {
            component.destroy();
        });
    }
}

export { Excel }
