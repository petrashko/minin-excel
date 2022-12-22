import { storage, debounce } from '@core/utils.js';
import { createStore } from '@core/createStore.js';
import { rootReducer } from '@/redux/rootReducer.js';
import { normalizeInitialState } from '@/redux/initialState.js';
import { Page } from '@core/Page.js';
import { Excel } from '@/components/excel/Excel.js';
import { Header } from '@/components/header/Header.js';
import { Toolbar } from '@/components/toolbar/Toolbar.js';
import { Formula } from '@/components/formula/Formula.js';
import { Table } from '@/components/table/Table.js';

function storageName(param) {
    return `excel:${param}`;
}

class ExcelPage extends Page {
    //
    constructor(params) {
        super(params);
    }

    //
    getRoot() {
        //console.log(this.params);
        const params = this.params ? this.params : Date.now().toString();

        const state = storage(storageName(params));
        const initialState = normalizeInitialState(state);
        const store = createStore(rootReducer, initialState);

        // Если, state будет изменяться чаще, чем 300 милисекунд
        // анонимная функция вызываться НЕ будет
        const stateListener = debounce((state) => {
            //console.log('App Store', state);
            storage(storageName(params), state);
        }, 300);

        store.subscribe(stateListener);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });

        return this.excel.getRoot();
    }

    //
    afterRender() {
        this.excel.init();
    }

    //
    destroy() {
        this.excel.destroy();
    }
}

export { ExcelPage }
