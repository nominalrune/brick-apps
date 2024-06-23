import { useEffect, useState } from 'react';
import AppDetailsLayout from '~/model/App/AppDetailsLayout';
import Position from '~/model/Position';
import Widget from '~/model/App/View/Widget';
import { DropResult } from 'react-beautiful-dnd';
import Column from '~/model/App/Column';
import Columns from '~/model/App/Columns';
import ColumnCode from '~/model/App/ColumnCode';

/**
 * App編集の時、View Contentの編集を担う。
 * 1. レイアウトの管理
 * 2. 個々のWidgetのconfig管理
 * ViewContentのitemsはcolumnsに依存
 * columnが変更になると、持ってるcolumnsも変わる。
 */
export default function useViewContent(columns: Columns, initialLayout?: AppDetailsLayout) {
	const [prevColumns, setPrev] = useState(columns);
	const [content, setContent] = useState<AppDetailsLayout>(initialLayout ?? new AppDetailsLayout([]));
	useEffect(() => {
		onColumnsUpdated(columns);
		setPrev(prev => columns);
	}, [columns]);
	/**
	 * appのcolumnsが変更になった場合、こちらのviewItemのcodeも変更する必要があるため、更新。
	 * 何かもっといい方法ないかしら。
	 *
	 */
	function onColumnsUpdated(newColumns: Columns) {
		const changed: { old: ColumnCode, new: Column; }[] = [];
		const removed: ColumnCode[] = [];
		prevColumns.forEach((oldC, i) => {
			if (oldC === null) { return; }
			const newC = newColumns[i];
			if (newC === null) {
				removed.push(oldC.code);
				return;
			}
			if (JSON.stringify(oldC) !== JSON.stringify(newC)) {
				changed.push({
					old: oldC.code,
					new: newC,
				});
				return;
			}
		});
		setContent(content => new AppDetailsLayout(content.map(row =>
			row.map(widget => {
				if (removed.includes(widget.code)) return null;
				// const changedColumn = changed.find(({ old, new: newC }) => old === widget.code);
				// if (!!changedColumn) {
				// 	return widget.with("column", changedColumn.new);
				// }
				return widget;
			}).filter((i): i is Widget => !!i)
		)));
		setPrev(newColumns);
	}
	function insert([x, y]: Position, inputData: Widget) {
		setContent(content.insert([x, y], new Widget(inputData)));
		
	}
	function move(from: Position, to: Position) {
		setContent(table => table.move(from, to));
	}
	function updateWidget([x, y]: Position, widget: Widget) {
		setContent(table => table.update([x, y], widget));
	}
	function removeWidget([x, y]: Position) {
		setContent(table => table.remove([x, y]));
	}
	function onDragEnd({ draggableId, destination, source }: DropResult) {
		if (!destination || (destination.droppableId === "palette")) {
			return;
		}

		const destRow = Number(destination.droppableId);
		const destCol = destination.index;

		if (source.droppableId === "palette") {
			const column = columns[source.index];
			if (!column || !column.code) { return; }
			const code = column.code;
			const newItem = new Widget({ type: "text", code, label: column.code, column, defaultValue: "", prefix: "", suffix: "", rules: undefined, });
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
	return {
		content,
		updateWidget,
		removeWidget,
		onColumnsUpdated,
		onDragEnd
	};
}
