import { useState } from 'react';
import NewApp from '~/model/App/NewApp';
import App from '~/model/App/App';
import WithoutMethods from '~/model/common/WithoutMethods';
import Widget from '~/model/App/View/Widget';
import Position from '~/model/Position';
import { DropResult } from 'react-beautiful-dnd';
import DetailLayout from '~/model/App/View/DetailLayout';
import { inputItems } from '~/model/App/View/InputTypes';
import AppRepository from '~/repository/App';
import { useNavigate } from '@remix-run/react';
import NewView from '~/model/App/View/NewView';
import View from '~/model/App/View/View';
import AppWithView from '~/model/App/AppWithView';
import AppData from '~/model/App/AppData';
import { is, validate } from 'typia';
import Table from '~/model/App/View/ListLayouts/Table';

type _App = WithoutMethods<AppWithView | NewApp>;
function _App(app: _App) {
	if (is<WithoutMethods<AppWithView>>(app)) { return new AppWithView(app, app.view); }
	if (is<WithoutMethods<NewApp>>(app)) { return new NewApp(app); }
	throw new Error('Invalid app instance given');
};

const _View = (view: WithoutMethods<View | NewView>) => {
	if (is<WithoutMethods<View>>(view)) { return new View(view); }
	if (is<WithoutMethods<NewView>>(view)) { return new NewView(view); }
	const result = validate<WithoutMethods<View | NewView>>(view);
	throw new Error(`Invalid view instance given. ${result.errors.map((e, i) => `${i}. ${e.path}:${e.expected} expected, ${e.value} given`)}`);
};

/**
 * App編集にて、Model/Appの編集を担う
 */
export default function useApp(initialAppState: AppWithView | NewApp) {
	const [app, setApp] = useState<AppWithView | NewApp>(initialAppState);
	type keyName = 'name' | "description" | 'code' | 'icon' | 'columns';
	function updateApp<K extends keyName>(key: K, value: _App[K]) {
		setApp(app => _App({ ...app, [key]: value }));
	}
	function setLayout(newLayout: DetailLayout | undefined) {
		setApp(app => _App({
			...app,
			columns: newLayout?.map(item => item).flat().map(i => i.column) ?? [],
			view: app.view ? _View({
				...app.view,
				detail: newLayout ?? new DetailLayout([])
			}) : new NewView({
				name: "new view",
				code: "new-view",
				app_code: app.code,
				description: "",
				detail: newLayout ?? new DetailLayout([]),
				list: {
					listType: "table",
					content: new Table([])
				},
			}),
		}));
	}
	function insert([x, y]: Position, inputData: Widget) {
		setLayout(app.view?.detail.insert([x, y], new Widget(inputData)));
	}
	function move(from: Position, to: Position) {
		setLayout(app.view?.detail.move(from, to));
	}
	function updateWidget([x, y]: Position, widget: Widget) {
		setLayout(app.view?.detail.update([x, y], widget));
	}
	function removeWidget([x, y]: Position) {
		setLayout(app.view?.detail.remove([x, y]));
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
			const code = type + "-" + (1 + Math.max(0, ...(app.view?.detail.content.flat().map(item => Number(item.code.split("-").at(-1))).filter(Number.isFinite) ?? [])));
			insert([destRow, destCol], new Widget({
				type: type,
				code,
				label: code,
				column: { code: code, valueType: "varchar" },
				defaultValue: "",
				prefix: "",
				suffix: "",
				rules: undefined,
				error: '',
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
			navigate(`/app/${res.code}/${res.default_view}`);
		} else if (app instanceof App) {
			if (!confirm(`アプリを更新しますか？`)) { return; }
			const appRepo = new AppRepository();
			const res = await appRepo.update(app);
			navigate(`/app/${res.code}/${res.default_view}`);
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


