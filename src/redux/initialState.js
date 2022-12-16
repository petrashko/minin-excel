import { storage } from '@core/utils.js';
import { defaultStyles, defaultTitle } from '@/constants.js';

//
const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles
}

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
});

const storageState = storage('excel-state');

const initialState = storageState ? normalize(storageState) : defaultState;

export { initialState }
