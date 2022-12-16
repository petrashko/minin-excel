import { $ } from '@core/dom.js';
import { defaultStyles } from '@/constants.js';
import { ExcelStateComponent } from '@core/ExcelStateComponent.js';
import { createToolbar } from '@/components/toolbar/toolbar.template.js';

class Toolbar extends ExcelStateComponent {
    //
    static  className = 'excel__toolbar';

    //
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            // Работа со store
            subscribe: ['currentStyles'],
            //
            ...options
        });
    }

    //
    prepare() {
        // const initialState = {
        //     textAlign: 'left',
        //     fontWeight: 'normal',
        //     textDecoration: 'none',
        //     fontStyle: 'normal'
        // }
        //Или
        const initialState = defaultStyles;
        this.initState(initialState);
    }

    //
    get template() {
        return createToolbar(this.state);
    }

    //
    toHTML() {
        return this.template;
    }

    //
    storeChanged(changes) {
        this.setState(changes.currentStyles);
    }

    //
    onClick(event) {
        const $target = $(event.target);
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value);
            //
            this.$emit('toolbar:applyStyle', value);

            //super.setState(value);
        }
    }
}

export { Toolbar }
