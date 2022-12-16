function capitalize(str) {
    if (typeof str !== 'string') {
        return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => {
            return start + index;
        });
}

function storage(key, data=null) {
    if (data) {
        localStorage.setItem(key, JSON.stringify(data));
        return null;
    }
    return JSON.parse( localStorage.getItem(key) );
}

function isEqual(some1, some2) {
    if ((typeof some1 === 'object') && (typeof some2 === 'object')) {
        return JSON.stringify(some1) === JSON.stringify(some2);
    }

    return some1 === some2;
}

function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, (q) => `-${q[0].toLowerCase()}`);
}

function toInlineStyles(styles={}) {
    return Object.keys(styles).map(key => {
        return `${camelToDashCase(key)}: ${styles[key]}`;
    }).join('; ');
}

// Например, полезно чтобы слишком часто не отправлять
// запросы на сервер, при пользовательском вводе
function debounce(func, wait) {
    let timeout = null;

    // Если функция вызывается чаще чем wait
    // - func(...args) вызываться НЕ будет
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        }
        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
    }
}

export {
    capitalize,
    range,
    storage,
    isEqual,
    camelToDashCase,
    toInlineStyles,
    debounce
}
