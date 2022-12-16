import * as dispatchActions from '@/redux/actions.js';
import { $ } from '@core/dom.js';
import { defaultTitle } from '@/constants.js';
import { ExcelComponent } from '@core/ExcelComponent.js';
import {debounce} from "../../core/utils";

class Header extends ExcelComponent {
    //
    static  className = 'excel__header';

    //
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            //
            ...options
        });
    }

    prepare() {
        // Если, пользователь будет вводить симфолы чаще,
        // чем 500 милисекунд onInput вызываться НЕ будет
        this.onInput = debounce(this.onInput.bind(this), 500);
    }

    //
    toHTML() {
        const title = this.store.getState().title || defaultTitle;
        return `
            <input type="text" class="input" value="${title}" />
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `;
    }

    //
    onInput(event) {
        const $target = $(event.target);
        this.$dispatch( dispatchActions.changeTitle($target.text()) );
    }
}

export { Header }
