import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "@/components/table/table.template";

class Table extends ExcelComponent {
    //
    static  className = 'excel__table';

    //
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: []
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
    init() {
        super.init();

        //const tableMaxHeight = document.documentElement.clientHeight - 98;
        //this.$root.$el.style.maxHeight = `${tableMaxHeight}px`;
    }
}

export {
Table
}
