const CODES = {
    A: 65,
    Z: 90
}

function createRow(index, content) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

/*
function toCell(row, col) {
    return `
        <div class="cell" contenteditable="true" spellcheck="false" data-col="${col}" data-row="${row}"></div>
    `;
}
*/
// Или с использованием замыканий
function toCell(row) {
    return function(_, col) {
        return `
            <div class="cell" contentEditable="true" spellCheck="false"
                    data-type="cell" data-col="${col}" data-id="${row}:${col}">
            </div>
        `;
    }
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function createTable(rowsCount = 15) {
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
        //.map(el => toColumn(el))
        // Или
        .map(toColumn)
        .join('');

    rows.push( createRow(null, cols) );

    for (let row=0; row < rowsCount; row++) {
        // Строка таблицы (с ячейками)
        const cells = new Array(colsCount)
            .fill('')
            //.map((_, col) => toCell(row, col))
            // Или с использованием замыканий
            .map(toCell(row))
            .join('');

        rows.push( createRow(row+1, cells) );
    }

    return rows.join('');
}

export {
    createTable
}
