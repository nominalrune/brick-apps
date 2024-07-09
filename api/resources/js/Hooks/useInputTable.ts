import { useState } from 'react';
import AppTable from '../Models/App/AppTable';
import Address from '../Models/Address';
import AppInputData from '@/Models/App/AppInputData';
import AppInput from '@/Models/App/AppInput';
export default function useInputsTable(initialTable?:AppInputData[][]) {
    const [table, setTable] = useState<AppTable>(initialTable?new AppTable(initialTable.map(i=>i.map(j=>AppInput.fromDTO(j)))):new AppTable([]));
    function get([row, col]: Address) {
        return table.get([row, col]);
    }

    function insert([x, y]: Address, inputData: AppInput) {
        setTable(table.insert([x, y], inputData));
    }
    function update([x, y]: Address, value: AppInput) {
        setTable(table => table.update([x,y], value));}

    function move(from: Address, to: Address) {
        setTable(table => table.move(from,to));
    }
    function remove([x, y]: Address) {
        setTable(table => table.remove([x, y]));
    }
    return { table, get, insert, move, update, remove };
}
