import { $ } from '@core/dom.js';
import { ExcelComponent } from '@core/ExcelComponent.js';
import { TableSelection } from '@/components/table/TableSelection';
import { createTable } from '@/components/table/table.template.js';
import { resizeHandler } from '@/components/table/table.resize.js';
import { shouldResize, isCell, matrix, nextSelector } from '@/components/table/table.functions.js';

class Table extends ExcelComponent {
    //
    static  className = 'excel__table';

    //
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            //
            ...options
        });
    }

    //
    /*
    toHTML() {
        return `
            <!-- 1-ая строка таблицы (с буквами) -->
            <div class="row">
                <div class="row-info"></div>
                <div class="row-data">
                    <div class="column">A</div>
                    <div class="column">B</div>
                    <div class="column">C</div>
                </div>
            </div>
            <!---->
            <div class="row">
                <div class="row-info">1</div>
                <div class="row-data">
                    <div class="cell selected" contenteditable="true" spellcheck="false">A1</div>
                    <div class="cell" contenteditable="true" spellcheck="false">B1</div>
                    <div class="cell" contenteditable="true" spellcheck="false">C1</div>
                </div>
            </div>
            <!---->
            <div class="row">
                <div class="row-info">2</div>
                <div class="row-data">
                    <div class="cell">A2</div>
                    <div class="cell">B2</div>
                    <div class="cell">C2</div>
                </div>
            </div>
            <!---->
        `;
    }
    */

    //
    toHTML() {
        return createTable(25);
    }

    //
    prepare() {
        this.selection = new TableSelection();
    }

    //
    init() {
        super.init();
        //const tableMaxHeight = document.documentElement.clientHeight - 98;
        //this.$root.$el.style.maxHeight = `${tableMaxHeight}px`;

        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);

        //
        this.$on('formula:input', (text) => {
            this.selection.current.text(text);
        });
        //
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
    }

    //
    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
    }

    //
    onMousedown(event) {
        if (shouldResize(event)) {
            event.preventDefault();
            resizeHandler(this.$root, event);
        }
        else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            }
            else {
                this.selection.select($target);
            }
        }
    }

    //
    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const {key} = event;

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();

            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next);
        }
    }

    //
    onInput(event) {
        if (isCell(event)) {
            this.$emit('table:select', $(event.target));
        }
    }
}

export { Table }
