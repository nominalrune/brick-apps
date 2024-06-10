import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import useAppEditor from '~/hooks/App/useAppEditor';
import AppEditHeader from '~/components/App/Edit/AppEditHeader';
import AppRepository from '~/repository/App';
import NewApp from '~/model/App/NewApp';
import Named from '~/lib/react-structured-form/src/types/Named';
import NewView from '~/model/App/View/NewView';
import AppLayoutEdit from '~/components/App/Edit/AppLayoutEdit';
import useViewLayout from '~/hooks/App/useViewLayout';
import View from '~/model/App/View/View';
import App from '~/model/App/App';
import Column from '~/model/App/Column';

export default function AppEdit({ app: _app, view }: { app: App | NewApp | null; view: View | NewView | null; }) {

	const { app, update } = useAppEditor(
		_app ?? new NewApp({ ...NewApp.blank(), columns: [] }));
	const { table, onColumnsUpdated } = useViewLayout(app.columns, view?.content);
	function updateColumns(columns: Column[]) {
		update("columns", columns);
		onColumnsUpdated(columns);
	}
	const repo = new AppRepository();
	function handleAppChange(e: ChangeEvent<Named<HTMLInputElement, keyof NewApp>>) {
		const name = e.target.name;
		if (name !== "name" && name !== "description" && name !== "icon" && name !== 'code') return;
		update(name, e.target.value);
	}
	async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
		if (!confirm("アプリを作成しますか？")) { return; }
		const res = await repo.createWithView(app, new NewView({
			code: `${app.code}-default`,
			app_code: app.code,
			name: "default",
			description: "default view",
			content: table,
		}));

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
		{/* {errors && <div>{Object.entries(errors).map(([key, msg]) => (<div key={key} className="text-red-600">{key}:{msg}</div>))}</div>} */}
		<AppLayoutEdit {...layoutState} />
	</>;
}
