import { DropResult } from "react-beautiful-dnd";
import useInputsTable from './useInputTable';
import AppInput from '../Models/App/AppInput';
import { InputTypeOption, defaultValueTypeMap } from '@/Models/App/InputTypes';
export default function useDnDAppEditor(paletteName:string, paletteItems: readonly InputTypeOption[] ) {
    const { table, get, insert, move, update, remove } = useInputsTable(1);
    function onDragEnd({ draggableId, destination, source }: DropResult) {
        console.log({ draggableId, destination, source });
        if (!destination || destination.droppableId === paletteName) {
            return;
        }
        const destRow = Number(destination.droppableId);
        const destCol = destination.index;
        if (source.droppableId === paletteName) {
            const type = paletteItems[source.index];
            const code = (type + "-" + Math.max(...table.flat().map(item => Number(item.code.split("-").at(-1))).filter(Number.isFinite)) + 1);
            insert([destRow, destCol], new AppInput(type, code, defaultValueTypeMap[type]));
            return;
        }
        const sourceRow = Number(source.droppableId);
        const sourceCol = source.index;
        if (!isFinite(destRow) || !isFinite(sourceRow)) { return; }
        if (destRow === sourceRow && destCol === sourceCol) {
            return;
        }
        move([sourceRow, sourceCol], [destRow, destCol]);
    }
    return { table, update, remove, onDragEnd };
}


