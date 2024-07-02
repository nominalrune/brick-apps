import Column from '~/model/App/Column';
import { useState } from 'react';
import NewApp from '~/model/App/NewApp';
import App from '~/model/App/App';
import AppBase from '~/model/App/AppBase';
import WithoutMethods from '~/model/common/WithoutMethods';
import Widget from '~/model/App/View/Widget';
import Position from '~/model/Position';
import { DropResult } from 'react-beautiful-dnd';
import DetailLayout from '~/model/App/View/DetailLayout';
import Columns from '~/model/App/Columns';
import ColumnCode from '~/model/App/ColumnCode';
import { useEffect } from 'react';
import { useRef } from 'react';
import { inputItems } from '~/model/App/View/InputTypes';
import AppRepository from '~/repository/App';
import { useNavigate } from '@remix-run/react';
import NewView from '~/model/App/View/NewView';
import View from '~/model/App/View/View';

const isApp = (app: WithoutMethods<App | NewApp>): app is App => app instanceof App;
const _App = (app: WithoutMethods<App | NewApp>) => isApp(app) ? new App(app) : new NewApp(app);
const _View = (view: WithoutMethods<View | NewView>) => view instanceof View ? new View(view) : new NewView(view);
/**
 * App編集にて、Model/Appの編集を担う
 */
export default function useApp<T extends App | NewApp = App | NewApp>(initialAppState: App | NewApp) {
	const [app, setApp] = useState<App | NewApp>(initialAppState);
	type keyName = 'name' | "description" | 'code' | 'icon' | 'columns';
	function updateApp<K extends keyName>(key: K, value: T[K]) {
		setApp(app => _App({ ...app, [key]: value }));
	}
	function setLayout(newLayout: DetailLayout|undefined) {
		setApp(app => _App({ ...app, columns:newLayout?.map(item=>item).flat().map(i=>i.column)??[], defaultView: _View({...app.defaultView, detail:newLayout??new DetailLayout([])}) }));
	}
	function insert([x, y]: Position, inputData: Widget) {
		setLayout(app.defaultView?.detail.insert([x, y], new Widget(inputData)));
	}
	function move(from: Position, to: Position) {
		setLayout(app.defaultView?.detail.move(from, to));
	}
	function updateWidget([x, y]: Position, widget: Widget) {
		setLayout(app.defaultView?.detail.update([x, y], widget));
	}
	function removeWidget([x, y]: Position) {
		setLayout(app.defaultView?.detail.remove([x, y]));
	}
	function onDragEnd({ draggableId, destination, source }: DropResult) {
		console.log({ draggableId, destination, source });
		if (!destination || (destination.droppableId === "palette")) {
			return;
		}

		const destRow = Number(destination.droppableId);
		const destCol = destination.index;

		if (source.droppableId === "palette") {
			const type = inputItems[source.index];
			const code = type + "-" + (1 + Math.max(0, ...(app.defaultView?.detail.content.flat().map(item => Number(item.code.split("-").at(-1))).filter(Number.isFinite) ?? [])));
			insert([destRow, destCol], new Widget({
				type: type,
				code,
				label: code,
				column: { code: code, valueType: "varchar" },
				defaultValue: "",
				prefix: "",
				suffix: "",
				rules: undefined,
			}));
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

	const navigate = useNavigate();
	async function save() {
		if (app instanceof NewApp) {
			if (!confirm(`アプリを作成しますか？`)) { return; }
			const repo = new AppRepository();
			const res = await repo.create(
				new NewApp(app)
			);
			navigate(`/app/${res.code}`);
		} else if (app instanceof App) {
			if (!confirm(`アプリを更新しますか？`)) { return; }
			const appRepo = new AppRepository();
			const res = await appRepo.update(app);
			navigate(`/app/${res.code}`);
		}
	}
	return {
		app,
		updateApp,
		updateWidget,
		removeWidget,
		onDragEnd,
		save
	};
}


