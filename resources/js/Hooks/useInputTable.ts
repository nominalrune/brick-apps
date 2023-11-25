import { useState } from 'react';
import AppInput from '../Models/App/AppInput';
import Address from '../Models/Address';

export default function useInputsTable(numberOfRows: number = 10) {
    const [table, setTable] = useState<AppInput[][]>(init(numberOfRows));
    function init(numberOfRows: number) {
        return Array(numberOfRows).fill([]);
    }
    function get([row, col]: Address) {
        return table[row]?.[col];
    }

    function insert([x, y]: Address, inputData: AppInput) {
        const newInputs = table[x].toSpliced(y, 0, inputData);
        setTable(table => table
            .map((row, i) => i === x ? newInputs : row)
            .concat([[]])
            .filter((row, i, table) => (row.length > 0 || i === table.length - 1))
        );
    }
    function update([x, y]: Address, value: AppInput) {
        const updated = table[x].toSpliced(y, 1, value);
        console.log("updated row:",updated);
        setTable(table => table
            .map((row, i) => i === x ? updated : row)
            .concat([[]])
            .filter((row, i, table) => (row.length > 0 || i === table.length - 1))
        );
        // setTable(table => table.map((row, i) => i === x ? row.map((item, j) => j === y ? value : item) : row));
    }

    function move([fromRow, fromCol]: Address, [toRow, toCol]: Address) {
        if (fromRow === toRow) {
            const clone = Array.from(table[fromRow]);
            const [removed] = clone.splice(fromCol, 1);
            clone.splice(toCol, 0, removed);
            setTable(table => table
                .map((row, i) => i === fromRow ? clone : row)
                .concat([[]])
                .filter((row, i, table) => (row.length > 0 || i === table.length - 1))
            );
            return;
        }
        const item = get([fromRow, fromCol]);
        if (!item) { return; }
        setTable(table => table
            .map((row, i) => i === fromRow ? row.toSpliced(fromCol, 1) : i === toRow ? row.toSpliced(toCol, 0, item) : row)
            .concat([[]])
            .filter((row, i, table) => (row.length > 0 || i === table.length - 1))
        );
    }
    function remove([x, y]: Address) {
        setTable(table => table
            .map((row, i) => i === x ? row.toSpliced(y, 1) : row)
            .filter((row, i, table) => (row.length > 0 || i === table.length - 1))
        );
    }
    return { table, get, insert, move, update, remove };
}
