// @core: см. файл 'webpack.config.js' раздел 'resolve'
import { $ } from '@core/dom';

class Excel {
    //
    constructor(selector, options) {
        //this.$el = document.querySelector(selector);
        this.$el = $(selector);
        this.components = options.components || [];
    }

    //
    getRoot() {
        const $root = $.create('div', 'excel');

        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
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
}

export {
    Excel
}
