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

type Prop = {
	app: NewApp | null;
	view: NewView | null;
} | {
	app: App;
	view: View;
};
export default function AppEdit({ app: _app, view }: Prop) {
	const { app, update } = useApp(
		_app ?? new NewApp({ ...NewApp.blank(), columns: [] }));
	const { content, onColumnsUpdated, updateWidget, removeWidget, onDragEnd } = useViewContent(app.columns, view?.content);
	function updateColumns(columns: Columns) {
		update("columns", columns);
		// onColumnsUpdated(columns);
	}
	function handleAppChange(e: ChangeEvent<Named<HTMLInputElement, keyof NewApp>>) {
		const name = e.target.name;
		if (name !== "name" && name !== "description" && name !== "icon" && name !== 'code') return;
		update(name, e.target.value);
	}
	async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
		if (app instanceof NewApp) {
			if (!confirm(`アプリを作成しますか？`)) { return; }
			const repo = new AppRepository();
			const res = await repo.createWithView(app, new NewView({
				code: `${app.code}-default`,
				app_code: app.code,
				name: "default",
				description: "default view",
				content: content,
			}));
		} else if (app instanceof App && view instanceof View) {
			if (!confirm(`アプリを更新しますか？`)) { return; }
			const appRepo = new AppRepository();
			const res = await appRepo.updateWithView(app, new View({...view, content}));
		}

	}
	function handleCancel() {
		window.history.back();
	}
	return <>
		<AppEditHeader
			submitLabel={"作成"}
			data={app}
			onChange={handleAppChange}
			onCancel={handleCancel}
			onSubmit={handleSubmit}
			onDelete={() => { }}
		/>
		<AppLayoutEdit
			columns={app.columns}
			columnsEditForm={<EditColumns columns={app.columns} update={updateColumns} />}
			table={content}
			updateWidget={updateWidget}
			removeWidget={removeWidget}
			onDragEnd={onDragEnd}
		/>
	</>;
}
