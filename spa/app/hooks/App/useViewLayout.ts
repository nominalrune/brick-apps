import { useEffect, useState } from 'react';
import ViewContent from '~/model/App/View/ViewContent';
import Position from '~/model/Position';
import Widget from '~/model/App/View/Widget';
import { DropResult } from 'react-beautiful-dnd';
import Field from '~/model/App/Field';
import Fields from '~/model/App/FIelds';
import FieldCode from '~/model/App/FieldCode';

/**
 * App編集の時、View Contentの編集を担う。
 * 1. レイアウトの管理
 * 2. 個々のWidgetのconfig管理
 * ViewContentのitemsはfieldsに依存
 * fieldが変更になると、持ってるfieldsも変わる。
 */
export default function useViewLayout(fields: Fields, initialTable?: ViewContent) {
	const [prevFields, setPrev] = useState(fields);
	const [table, setTable] = useState<ViewContent>(initialTable ?? new ViewContent([]));
	useEffect(() => {
		onFieldsUpdated(fields);
		setPrev(prev => fields);
	}, [fields]);
	/**
	 * appのfieldsが変更になった場合、こちらのviewItemのcodeも変更する必要があるため、更新。
	 * 何かもっといい方法ないかしら。
	 *
	 */
	function onFieldsUpdated(newFields: Fields) {
		const changed: { old: FieldCode, new: Field; }[] = [];
		const removed: FieldCode[] = [];
		prevFields.forEach((oldF, i) => {
			if (oldF === null) { return; }
			const newF = newFields[i];
			if (newF === null) {
				removed.push(oldF.code);
				return;
			}
			if (JSON.stringify(oldF) !== JSON.stringify(newF)) {
				changed.push({
					old: oldF.code,
					new: newF,
				});
				return;
			}
		});
		setTable(table => new ViewContent(table.map(row =>
			row.map(widget => {
				if (removed.includes(widget.code)) return null;
				const changedField = changed.find(({ old, new: newF }) => old === widget.code);
				if (!!changedField) {
					return widget.with("field", changedField.new);
				}
				return widget;
			}).filter((i): i is Widget => !!i)
		)));
		setPrev(newFields);
	}
	function insert([x, y]: Position, inputData: Widget) {
		setTable(table.insert([x, y], new Widget(inputData)));
	}
	function move(from: Position, to: Position) {
		setTable(table => table.move(from, to));
	}
	function onDragEnd({ draggableId, destination, source }: DropResult) {
		if (!destination || (destination.droppableId === "palette")) {
			return;
		}

		const destRow = Number(destination.droppableId);
		const destCol = destination.index;

		if (source.droppableId === "palette") {
			const field = fields[source.index];
			if (!field || !field.code) { return; }
			const code = field.code;
			const newItem = new Widget({ type: "text", code, label: field.code, field, defaultValue: "", prefix: "", suffix: "", rules: undefined, });
			insert([destRow, destCol], newItem);
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
	return { table, onFieldsUpdated, onDragEnd };
}
