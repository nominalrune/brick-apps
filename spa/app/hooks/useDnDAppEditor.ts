import { DropResult } from "react-beautiful-dnd";
import useInputsTable from './useInputTable/useInputTable';
import ViewItem from '../model/App/View/ViewItem';
import Field from '~/model/App/Field';
import { useState } from 'react';
export default function useDnDAppEditor(initialFields: Field[], initialTable?: ViewItem[][]) {
	const { table, get, insert, move, update: updateTable, remove: removeTableItem } = useInputsTable(initialTable);
	const [fields, setFields] = useState<Field[]>(initialFields);
	function updateFields(index: number, field: Field) {
		setFields(fields => fields.map((f, i) => i === index ? field : f));
	}
	function deleteField(index: number) {
		setFields(fields => fields.filter((_, i) => i !== index));
	}
	function onDragEnd({ draggableId, destination, source }: DropResult) {
		console.log({ draggableId, destination, source });

		if (!destination || destination.droppableId === "palette") {
			return;
		}

		const destRow = Number(destination.droppableId);
		const destCol = destination.index;

		// if (source.droppableId === "palette") {
			const field = fields[source.index];
			const code = field.code + "-" + (1 + Math.max(0, ...table.form.flat().map(item => Number(item.code.split("-").at(-1))).filter(Number.isFinite)));
			// setFields(fields => [...fields, { ...field, code, }]);
			const newItem = new ViewItem({ type: "text", code, label: field.code, defaultValue: "", });
			console.log({ newItem, fields });
			insert([destRow, destCol], newItem);
			console.log({ table });
		// 	return;
		// }
		// if (source.droppableId === "palette") {
		// 	setFields(fields => fields.filter((_, i) => i !== source.index));
		// }

		const sourceRow = Number(source.droppableId);
		const sourceCol = source.index;
		if (!isFinite(destRow) || !isFinite(sourceRow)) { return; }
		if (destRow === sourceRow && destCol === sourceCol) {
			return;
		}
		move([sourceRow, sourceCol], [destRow, destCol]);
	}

	return { table, fields, updateFields, deleteField, updateTable, removeTableItem, onDragEnd };
}


