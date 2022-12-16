//
function createStore(rootReducer, initialState={}) {
    //
    let state = rootReducer(initialState, {
        type: '__INIT_APP__'
    });
    let listeners = [];

    const store = {
        subscribe(func) {
            // func: Функция, которая принимает state
            listeners.push(func);

            return {
                // Функция, которая позволяет отписаться
                unsubscribe() {
                    listeners = listeners.filter(listener => listener !== func);
                }
            }
        },
        //
        dispatch(action) {
            state = rootReducer(state, action);
            //
            listeners.forEach(listener => listener(state));
        },
        //
        getState() {
            return JSON.parse(JSON.stringify(state));
        }
    };

    return store;
}

//*******************************************************************

export { createStore }
