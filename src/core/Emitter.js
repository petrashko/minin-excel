//
class Emitter {
    //
    constructor() {
        this.listeners = {};
    }

    // Тригерим кастомное событие
    // fire, trigger, dispatch
    emit(eventName, ...args) {
        if (!Array.isArray(this.listeners[eventName])) {
            return false;
        }

        this.listeners[eventName].forEach(listener => {
            listener(...args);
        });

        return true;
    }

    // Подписка на кастомное событие
    subsribe(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);

        // Вернуть функцию, которая позволяет отписаться
        return () => {
            this.listeners[eventName] =
                this.listeners[eventName].filter(listener => listener !== fn);
        }
    }
}

//**** TESTING ******************************************************
/*
const emitter = new Emitter();

const unsub = emitter.subsribe('eventTest', (data) => console.log('Sub:', data));
emitter.emit('eventTest', 100);

setTimeout(() => {
    // Отписаться от события 'eventTest'
    unsub();
}, 3000);

setTimeout(() => {
    emitter.emit('eventTest', 'After 2 seconds');
}, 2000);
setTimeout(() => {
    emitter.emit('eventTest', 'After 4 seconds');
}, 4000);
emitter.emit('eventTest', 100);
*/
//*******************************************************************

export { Emitter }
