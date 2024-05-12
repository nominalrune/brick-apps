import { useState } from 'react';
import ViewContent from '~/model/App/View/ViewContent';
import Address from '~/model/Address';
import ViewItemData from '~/model/App/View/ViewItemData';
import ViewItem from '~/model/App/View/ViewItem';
export default function useInputsTable(initialTable?:ViewItemData[][]) {
    const [table, setTable] = useState<ViewContent>(initialTable?new ViewContent(initialTable.map(i=>i.map(j=>ViewItem.fromData(j)))):new ViewContent([]));
    function get([row, col]: Address) {
        return table.get([row, col]);
    }

    function insert([x, y]: Address, inputData: ViewItem) {
        setTable(table.insert([x, y], inputData));
    }
    function update([x, y]: Address, value: ViewItem) {
        setTable(table => table.update([x,y], value));}

    function move(from: Address, to: Address) {
        setTable(table => table.move(from,to));
    }
    function remove([x, y]: Address) {
        setTable(table => table.remove([x, y]));
    }
    return { table, get, insert, move, update, remove };
}
