import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import useAppEditor from '~/hooks/App/useAppEditor';
import AppEditHeader from '~/components/App/Edit/AppEditHeader';
import AppRepository from '~/repository/App';
import NewApp from '~/model/App/NewApp';
import Named from '~/lib/react-structured-form/src/types/Named';
import NewView from '~/model/App/View/NewView';
import AppLayoutEdit from '~/components/App/Edit/AppLayoutEdit';
import Widget from '~/model/App/View/Widget';

export default function Create() {
	// return <></>
	const layoutState = useAppEditor(
		new NewApp({...NewApp.blank(), fields:[]}),
		[]);
	const repo = new AppRepository();
	function handleAppChange(e: ChangeEvent<Named<HTMLInputElement, keyof NewApp>>) {
		const name = e.target.name;
		if (name !== "name" && name !== "description" && name !== "icon" && name !== 'code') return;
		layoutState.updateApp(name, e.target.value);
		// setNewApp(new NewApp({ ...newApp, [e.target.name]: e.target.value }));
		// setNewView(new NewView({ ...newView, [e.target.name]: e.target.value }));
	}
	async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
		if (!confirm("アプリを作成しますか？")) { return; }
		const res = await repo.createWithView(layoutState.app, new NewView({
			code:`${layoutState.app.code}-default`,
			app_code: layoutState.app.code,
			name:"default",
			description:"default view",
			content: layoutState.table,
		}));

	}
	function handleCancel() {
		window.history.back();
	}
	return <>
		<AppEditHeader
			submitLabel={"作成"}
			data={layoutState.app}
			onChange={handleAppChange}
			onCancel={handleCancel}
			onSubmit={handleSubmit}
			onDelete={() => { }}
		/>
		{/* {errors && <div>{Object.entries(errors).map(([key, msg]) => (<div key={key} className="text-red-600">{key}:{msg}</div>))}</div>} */}
		<AppLayoutEdit {...layoutState} />
	</>;
}
