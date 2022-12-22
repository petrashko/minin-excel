import { defaultStyles, defaultTitle } from '@/constants.js';
import { clone } from '@core/utils.js';

//
const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON()
}

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
});

const normalizeInitialState = (state) => {
    return state ? normalize(state) : clone(defaultState);
}

export { normalizeInitialState }
