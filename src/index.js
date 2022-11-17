import './scss/index.scss';
// @: см. файл 'webpack.config.js' раздел 'resolve'
import { Excel } from "@/components/excel/Excel";
import { Header } from "@/components/header/Header";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { Formula } from "@/components/formula/Formula";
import { Table } from "@/components/table/Table";

window.addEventListener('DOMContentLoaded', (ev) => {
    'use strict';
    console.log('WoW!');

    const excel = new Excel('#app', {
        components: [Header, Toolbar, Formula, Table]
    });

    excel.render();
});
