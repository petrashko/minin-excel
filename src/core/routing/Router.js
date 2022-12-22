import { $ } from '@core/dom.js';
import { ActiveRoute } from './ActiveRoute.js';

class Router {
    //
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router');
        }
        //this.$placeholder = document.querySelector(selector);
        this.$placeholder = $(selector);
        this.routes = routes;
        this.page = null;

        this.changePageHandler = this.changePageHandler.bind(this);
        //
        this.init();
    }

    //
    init() {
        // Обработать, изменения части URL следующей за #, включая сам знак #
        window.addEventListener('hashchange', this.changePageHandler);

        this.changePageHandler();
    }

    //
    changePageHandler() {
        //console.log(ActiveRoute.path);
        //console.log(ActiveRoute.params);
        if (this.page) {
            this.page.destroy();
        }
        this.$placeholder.clear();

        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard;

        this.page = new Page(ActiveRoute.param);
        this.$placeholder.append( this.page.getRoot() );

        this.page.afterRender();
    }

    //
    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    }
}

export { Router }
