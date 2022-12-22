import * as dispatchActions from '@/redux/actions.js';
import { defaultTitle } from '@/constants.js';
import { $ } from '@core/dom.js';
import { debounce } from '@core/utils.js';
import { ExcelComponent } from '@core/ExcelComponent.js';
import { ActiveRoute } from '@core/routing/ActiveRoute.js';

class Header extends ExcelComponent {
    //
    static  className = 'excel__header';

    //
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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
                <div class="button" data-button="remove">
                    <i class="material-icons" data-button="remove">delete</i>
                </div>
                <div class="button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
            </div>
        `;
    }

    //
    onInput(event) {
        const $target = $(event.target);
        this.$dispatch( dispatchActions.changeTitle($target.text()) );
    }

    //
    onClick(event) {
        const $target = $(event.target);

        if ($target.data.button === 'remove') {
            const decision = confirm('Вы действительно хотите удалить таблицу?');
            if (decision) {
                localStorage.removeItem(`excel:${ActiveRoute.param}`);
                ActiveRoute.navigate('#dashboard');
            }
        }

        if ($target.data.button === 'exit') {
            ActiveRoute.navigate('#dashboard');
        }
    }
}

export { Header }
