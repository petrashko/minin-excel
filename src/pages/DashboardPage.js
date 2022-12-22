import { $ } from '@core/dom.js';
import { Page } from '@core/Page.js';
import { createRecordsTable } from './dashboard.functions';

class DashboardPage extends Page {
    //
    constructor(params) {
        super(params);
    }

    //
    getRoot() {
        const now = Date.now().toString();

        return $.create('div', 'db').html(`
            <div class="db__header">
                <h1>Excel Панель Управления</h1>
            </div>
    
            <div class="db__new">
                <div class="db__view">
                  <a href="#excel/${now}" class="db__create">Новая<br/>Таблица</a>
                </div>
            </div>
    
            <div class="db__table db__view">
                ${ createRecordsTable() }
            </div>
        `);
    }
}

export { DashboardPage }