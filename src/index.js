import './scss/index.scss';
// @, @core: см. файл 'webpack.config.js' раздел 'resolve'
import { Router } from '@core/routing/Router.js';
import { DashboardPage } from '@/pages/DashboardPage.js';
import { ExcelPage } from '@/pages/ExcelPage.js';

window.addEventListener('DOMContentLoaded', (ev) => {
    'use strict';
    console.log('WoW!');

    new Router('#app', {
        dashboard: DashboardPage,
        excel: ExcelPage
    });
});
