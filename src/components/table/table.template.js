import { defaultStyles } from '@/constants.js';
import { toInlineStyles } from '@core/utils.js';
import { parse } from '@core/parse.js';

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

// Используем замыкания
function withWidthFrom(state) {
    return function(col, index) {
        return {
            col,
            index,
            width: getWidth(state, index)
        };
    }
}

function createRow(index, content, state) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    const height = getHeight(state, index);
    return `
        <div class="row" style="height: ${height}" data-row="${index}" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

// Используем замыкания
function toCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`;
        const data = state.dataState[id];
        const width = getWidth(state.colState, col);
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        });
        return `
            <div class="cell" contentEditable="true" spellCheck="false"
                    style="${styles}; width: ${width}"
                    data-type="cell" data-col="${col}" data-id="${id}"
                    data-value="${data || ''}"
            >${parse(data) || ''}</div>
        `;
    }
}

function toColumn({col, index, width}) {
    return `
        <div class="column" style="width: ${width}"
                data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function createTable(rowsCount=15, state={}) {
    // const alphabet = [
    //     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    //     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    // ];
    const colsCount = CODES.Z - CODES.A + 1;  // Compute cols count
    const rows = [];

    // 1-ая строка таблицы (с буквами)
    const cols = new Array(colsCount)
        .fill('')
        //.map((el, ind) => toChar(el, ind))
        // Или
        .map(toChar)
        // Используем замыкания
        .map(withWidthFrom(state.colState))
        // Функция withWidthFrom() возвращает объект, который
        // первым параметром передается в функцию toColumn
        .map(toColumn)
        .join('');

    rows.push( createRow(null, cols, {}) );

    for (let row=0; row < rowsCount; row++) {
        // Строка таблицы (с ячейками)
        const cells = new Array(colsCount)
            .fill('')
            //.map((_, col) => toCell(state, row, col))
            // Или с использованием замыканий
            .map(toCell(state, row))
            .join('');

        rows.push( createRow(row+1, cells, state.rowState) );
    }

    return rows.join('');
}

export {
    createTable
}
