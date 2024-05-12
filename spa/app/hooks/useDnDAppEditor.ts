import { DropResult } from "react-beautiful-dnd";
import useInputsTable from './useInputTable/useInputTable';
import ViewItem from '../model/App/View/ViewItem';
import AppInputData from '@/Models/App/AppInputData';
import { InputTypeOption, defaultValueTypeMap } from '@/Models/App/InputTypes';
export default function useDnDAppEditor(paletteName:string, paletteItems: readonly InputTypeOption[], initialTable?:AppInputData[][] ) {
    const { table, get, insert, move, update, remove } = useInputsTable(initialTable);
    function onDragEnd({ draggableId, destination, source }: DropResult) {
        console.log({ draggableId, destination, source });
        if (!destination || destination.droppableId === paletteName) {
            return;
        }
        const destRow = Number(destination.droppableId);
        const destCol = destination.index;
        if (source.droppableId === paletteName) {
            const type = paletteItems[source.index];
            const code = type + "-" + (1 + Math.max(0, ...table.form.flat().map(item => Number(item.code.split("-").at(-1))).filter(Number.isFinite)));
            insert([destRow, destCol], new ViewItem(type, code, defaultValueTypeMap[type]));
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


