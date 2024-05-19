import { useState } from 'react';
import ViewContent from '~/model/App/View/ViewContent';
import Position from '~/model/Position';
import ViewItemData from '~/model/App/View/ViewItemData';
import ViewItem from '~/model/App/View/ViewItem';
export default function useInputsTable(initialTable?:ViewItemData[][]) {
    const [table, setTable] = useState<ViewContent>(initialTable?new ViewContent(initialTable.map(i=>i.map(j=>ViewItem.fromData(j)))):new ViewContent([]));
    function get([row, col]: Position) {
        return table.get([row, col]);
    }

    function insert([x, y]: Position, inputData: ViewItem) {
        setTable(table.insert([x, y], inputData));
    }
    function update([x, y]: Position, value: ViewItem) {
        setTable(table => table.update([x,y], value));}

    function move(from: Position, to: Position) {
        setTable(table => table.move(from,to));
    }
    function remove([x, y]: Position) {
        setTable(table => table.remove([x, y]));
    }
    return { table, get, insert, move, update, remove };
}
