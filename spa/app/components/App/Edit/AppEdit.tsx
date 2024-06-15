import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import useApp from '~/hooks/App/useApp';
import AppEditHeader from '~/components/App/Edit/AppEditHeader';
import AppRepository from '~/repository/App';
import NewApp from '~/model/App/NewApp';
import NewView from '~/model/App/View/NewView';
import AppLayoutEdit from '~/components/App/Edit/AppLayoutEdit';
import useViewContent from '~/hooks/App/useViewContent';
import View from '~/model/App/View/View';
import App from '~/model/App/App';
import Column from '~/model/App/Column';
import EditColumns from './EditColumns';
import Columns from '~/model/App/Columns';
import ViewRepository from '~/repository/App/ViewRepository';
import { useNavigate } from '@remix-run/react';
import Widget from '~/model/App/View/Widget';

type Prop = {
	app: NewApp | null;
	view: NewView | null;
} | {
	app: App;
	view: View;
};
export default function AppEdit({ app: _app, view }: Prop) {
	const {
		app,
		updateApp,
		updateWidget,
		removeWidget,
		onDragEnd
	} = useApp(
		_app ?? new NewApp({ ...NewApp.blank(), columns: [] }));
	const navigate = useNavigate();
	function updateColumns(columns: Columns) {
		updateApp("columns", columns);
		// onColumnsUpdated(columns);
	}
	function handleAppChange(name: string, value: string) {
		if (name !== "name" && name !== "description" && name !== "icon" && name !== 'code') return;
		updateApp(name, value);
	}
	async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
		if (app instanceof NewApp) {
			if (!confirm(`アプリを作成しますか？`)) { return; }
			const repo = new AppRepository();
			const res = await repo.create(
				new NewApp(app)
			);
			navigate(`/app/${res.code}`);
		} else if (app instanceof App && view instanceof View) {
			if (!confirm(`アプリを更新しますか？`)) { return; }
			const appRepo = new AppRepository();
			const res = await appRepo.update(app);
			navigate(`/app/${res.code}`);
		}

	}
	function handleCancel() {
		window.history.back();
	}
	return <>
		<AppEditHeader
			submitLabel={"作成"}
			data={app}
			update={handleAppChange}
			onCancel={handleCancel}
			onSubmit={handleSubmit}
			onDelete={() => { }}
		/>
		<AppLayoutEdit
			app={app}
			updateWidget={updateWidget}
			removeWidget={removeWidget}
			onDragEnd={onDragEnd}
		/>
	</>;
}
