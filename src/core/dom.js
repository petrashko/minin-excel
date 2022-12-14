class Dom {
    //
    constructor(selector) {
        if (selector.tagName) {
            this.$el = selector;
        }
        else {
            this.$el = document.querySelector(selector);
        }
    }

    //
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    //
    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text;
            return this;
        }

        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }

    //
    clear() {
        this.html('');
        return this;
    }

    //
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    //
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    //
    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    //
    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        if (Element.prototype.append) {
            this.$el.append(node);
        }
        else {
            this.$el.appendChild(node);
        }

        return this;
    }

    //
    get data() {
        return this.$el.dataset;
    }

    //
    closest(selector) {
        return $(this.$el.closest(selector));
    }

    //
    getCoords() {
        const coords = this.$el.getBoundingClientRect();
        return coords;
    }

    //
    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    //
    css(styles = {}) {
        // for (const key in styles) {
        //     if (styles.hasOwnProperty(key)) {
        //         this.$el.style[key] = styles[key];
        //     }
        // }
        Object
            .keys(styles)
            .forEach(key => this.$el.style[key] = styles[key]);
    }

    //
    getStyles(styles=[]) {
        return styles.reduce((total, s) => {
            total[s] = this.$el.style[s];
            return total;
        }, {});
    }

    //
    id(parse) {
        if (parse) {
            const parsed = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id;
    }

    //
    focus() {
        this.$el.focus();
        return this;
    }

    //
    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value);
            return this;
        }
        return this.$el.getAttribute(name);
    }

    //
    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    //
    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }
}

//*******************************************************************

function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes='') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }

    return $(el);
}

//*******************************************************************

export {
    $
}
