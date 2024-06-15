import Column from '~/model/App/Column';
import { useState } from 'react';
import NewApp from '~/model/App/NewApp';
import App from '~/model/App/App';
import AppBase from '~/model/App/AppBase';
import WithoutMethods from '~/model/common/WithoutMethods';
import Widget from '~/model/App/View/Widget';
import Position from '~/model/Position';
import { DropResult } from 'react-beautiful-dnd';
import AppDetailsLayout from '~/model/App/AppDetailsLayout';
import Columns from '~/model/App/Columns';
import ColumnCode from '~/model/App/ColumnCode';
import { useEffect } from 'react';
import { useRef } from 'react';

const isApp = (app: WithoutMethods<App | NewApp>): app is App => app instanceof App;
const _App = (app: WithoutMethods<AppBase>) => isApp(app) ? new App(app) : new NewApp(app);
/**
 * App編集にて、Model/Appの編集を担う
 */
export default function useApp<T extends AppBase = App | NewApp>(initialAppState: App | NewApp) {
	const [app, setApp] = useState<App | NewApp>(initialAppState);
	type keyName = 'name' | "description" | 'code' | 'icon' | 'columns';
	function updateApp<K extends keyName>(key: K, value: T[K]) {
		setApp(app => _App({ ...app, [key]: value }));
	}
	const prevColumns= useRef(app.columns);
	function setLayout(newLayout: AppDetailsLayout) {
		setApp(app => _App({ ...app, layout: newLayout }));
	}
	useEffect(() => {
		onColumnsUpdated(app.columns);
	}, [app.columns]);
	/**
	 * appのcolumnsが変更になった場合、こちらのviewItemのcodeも変更する必要があるため、更新。
	 * 何かもっといい方法ないかしら。
	 *
	 */
	function onColumnsUpdated(newColumns: Columns) {
		const changed: { old: ColumnCode, new: Column; }[] = [];
		const removed: ColumnCode[] = [];
		prevColumns.current.forEach((oldC, i) => {
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
		setLayout(new AppDetailsLayout(app.layout.content.map(row =>
			row.map(widget => {
				if (removed.includes(widget.code)) return null;
				const changedColumn = changed.find(({ old, new: newC }) => old === widget.code);
				if (!!changedColumn) {
					return widget.with("column", changedColumn.new);
				}
				return widget;
			}).filter((i): i is Widget => !!i)
		)));
		prevColumns.current = newColumns;
	}
	function insert([x, y]: Position, inputData: Widget) {
		setLayout(app.layout.insert([x, y], new Widget(inputData)));
	}
	function move(from: Position, to: Position) {
		setLayout(app.layout.move(from, to));
	}
	function updateWidget([x, y]: Position, widget: Widget) {
		setLayout(app.layout.update([x, y], widget));
	}
	function removeWidget([x, y]: Position) {
		setLayout(app.layout.remove([x, y]));
	}
	function onDragEnd({ draggableId, destination, source }: DropResult) {
		if (!destination || (destination.droppableId === "palette")) {
			return;
		}

		const destRow = Number(destination.droppableId);
		const destCol = destination.index;

		if (source.droppableId === "palette") {
			const column = app.columns[source.index];
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
		app,
		updateApp,
		updateWidget,
		removeWidget,
		onDragEnd
	};
}


