//
class ActiveRoute {
    //
    static get path() {
        // slice(1): Убрать # из начала строки
        return window.location.hash.slice(1);
    }

    //
    static get params() {
        return ActiveRoute.path.split('/');
    }

    //
    static get param() {
        return ActiveRoute.path.split('/')[1];
    }

    //
    static navigate(path) {
        window.location.hash = path;
    }
}

export { ActiveRoute }