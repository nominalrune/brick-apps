import { DropResult } from "react-beautiful-dnd";
import useInputsTable from './useInputsTable/useInputsTable';
import ViewItem from '../../model/App/View/ViewItem';
import Field from '~/model/App/Field';
import { useState } from 'react';
import NewApp from '~/model/App/NewApp';
import { SetStateAction } from 'react';
export default function useDnDAppEditor(initialAppState: NewApp, initialTable: ViewItem[][]) {
	const { table, get, insert, move, update: updateTable, remove: removeTableItem } = useInputsTable(initialTable);
	const [app, setApp] = useState<NewApp>(initialAppState);
	const fields = app.fields;
	function updateApp(name: 'name'|"description"|'code'|'icon', value: NewApp[typeof name]) {
		setApp(app => new NewApp({ ...app, [name]: value }));
	}
	function setFields(callback: (prev: Field[]) => Field[]) {
		setApp(app => new NewApp({ ...app, fields: callback(app.fields) }));
	}
	function updateField(index: number, field: Field) {
		setFields(fields => fields.map((f, i) => i === index ? field : f));
	}
	function deleteField(index: number) {
		setFields(fields => fields.filter((_, i) => i !== index));
	}
	function onDragEnd({ draggableId, destination, source }: DropResult) {
		if (!destination || (destination.droppableId === "palette")) {
			return;
		}

		const destRow = Number(destination.droppableId);
		const destCol = destination.index;

		if (source.droppableId === "palette") {
			// setFields(fields => fields.filter((_, i) => i !== source.index));
			const field = fields[source.index];
			const code = field.code + "-" + (1 + Math.max(0, ...table.content.flat().map(item => Number(item.code.split("-").at(-1))).filter(Number.isFinite)));
			// setFields(fields => [...fields, { ...field, code, }]);
			const newItem = new ViewItem({ type: "text", code, label: field.code, defaultValue: "", });
			console.log(structuredClone({ newItem }));
			insert([destRow, destCol], newItem);
			console.log(structuredClone({ table }));
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

	return { app, updateApp, table, updateField, deleteField, updateTable, removeTableItem, onDragEnd };
}


