const CODES = {
    A: 65,
    Z: 90
}

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toCell() {
    return `
        <div class="cell" contenteditable="true" spellcheck="false"></div>
    `;
}

function toColumn(col) {
    return `
        <div class="column">${col}</div>
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

    const colsCount = CODES.Z - CODES.A + 1;
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

    for (let i=0; i < rowsCount; i++) {
        // Строка таблицы (с ячейками)
        const cells = new Array(colsCount)
            .fill('')
            //.map(el => toCell())
            // Или
            .map(toCell)
            .join('');

        rows.push( createRow(i+1, cells) );
    }

    return rows.join('');
}

export {
    createTable
}
