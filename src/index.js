import './scss/index.scss';
// @, @core: см. файл 'webpack.config.js' раздел 'resolve'
import { storage, debounce } from '@core/utils.js';
import { createStore } from '@core/createStore.js';
import { rootReducer } from '@/redux/rootReducer.js';
import { initialState } from '@/redux/initialState.js';
import { Excel } from '@/components/excel/Excel.js';
import { Header } from '@/components/header/Header.js';
import { Toolbar } from '@/components/toolbar/Toolbar.js';
import { Formula } from '@/components/formula/Formula.js';
import { Table } from '@/components/table/Table.js';

window.addEventListener('DOMContentLoaded', (ev) => {
    'use strict';
    console.log('WoW!');

    const store = createStore(rootReducer, initialState);

    // Если, state будет изменяться чаще, чем 300 милисекунд
    // анонимная функция вызываться НЕ будет
    const stateListener = debounce((state) => {
        //console.log('App Store', state);
        storage('excel-state', state);
    }, 300);

    store.subscribe(stateListener);

    const excel = new Excel('#app', {
        components: [Header, Toolbar, Formula, Table],
        store
    });

    excel.render();
});
