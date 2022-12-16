import * as dispatchTypes from './types.js';

//
function rootReducer(state, action) {
    //console.log(action);
    let field = null;
    let val = null;
    switch (action.type) {
        case dispatchTypes.TABLE_RESIZE:
            field = action.payload.type === 'col' ? 'colState' : 'rowState';
            return {
                ...state,
                [field]: value(state, field, action)
            }
        case dispatchTypes.CHANGE_TEXT:
            field = 'dataState';
            return {
                ...state,
                currentText: action.payload.value,
                [field]: value(state, field, action)
            }
        case dispatchTypes.CHANGE_STYLES:
            return {
                ...state,
                currentStyles: action.payload
            }
        case dispatchTypes.APPLY_STYLE:
            field = 'stylesState';
            val = state[field] || {};
            action.payload.ids.forEach(id => {
                val[id] = {...val[id], ...action.payload.value};
            });
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.payload.value}
            }
        case dispatchTypes.CHANGE_TITLE:
            return {
                ...state,
                title: action.payload
            }
        default:
            return state;
    }
}

function value(state, field, action) {
    const val = state[field] || {};
    val[action.payload.id] = action.payload.value;
    return val;
}

//*******************************************************************

export { rootReducer }