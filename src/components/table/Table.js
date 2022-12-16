import * as dispatchActions from '@/redux/actions.js';
import { $ } from '@core/dom.js';
import { parse } from '@core/parse.js';
import { defaultStyles } from '@/constants.js';
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
    toHTML() {
        return createTable(25, this.store.getState());
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
            this.selection.current.attr('data-value', text)
            this.selection.current.text(parse(text));
            this.updateTextInStore(text);
        });
        //
        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
        //
        this.$on('toolbar:applyStyle', (style) => {
            this.selection.applyStyle(style);
            //
            this.$dispatch( dispatchActions.applyStyle({
                value: style,
                ids: this.selection.selectedIds
            }) );
        });
    }

    //
    selectCell($cell) {
        this.selection.select($cell);
        //
        this.$emit('table:select', $cell);
        //
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch( dispatchActions.changeStyles(styles) );
    }

    //
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch( dispatchActions.tableResize(data) );
        } catch (err) { console.warn(err); }
    }

    //
    updateTextInStore(value) {
        this.$dispatch( dispatchActions.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    //
    onMousedown(event) {
        if (shouldResize(event)) {
            event.preventDefault();
            this.resizeTable(event);
        }
        else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            }
            else {
                this.selectCell($target);
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
            //this.$emit('table:select', $(event.target));
            // Работаем (связываем компоненты Table и Formula)
            // через store
            this.updateTextInStore( $(event.target).text() );
        }
    }
}

export { Table }
