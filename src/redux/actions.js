import * as dispatchTypes from './types.js';

// Actions Creator

function tableResize(data) {
    return {
        type: dispatchTypes.TABLE_RESIZE,
        payload: data
    }
}

function changeText(data) {
    return {
        type: dispatchTypes.CHANGE_TEXT,
        payload: data
    }
}

function changeStyles(data) {
    return {
        type: dispatchTypes.CHANGE_STYLES,
        payload: data
    }
}

function applyStyle(data) {
    return {
        type: dispatchTypes.APPLY_STYLE,
        payload: data
    }
}

function changeTitle(data) {
    return {
        type: dispatchTypes.CHANGE_TITLE,
        payload: data
    }
}

//*******************************************************************

export {
    tableResize,
    changeText,
    changeStyles,
    applyStyle,
    changeTitle
}
