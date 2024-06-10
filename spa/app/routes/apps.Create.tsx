import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import useApp from '~/hooks/App/useApp';
import AppEditHeader from '~/components/App/Edit/AppEditHeader';
import AppRepository from '~/repository/App';
import NewApp from '~/model/App/NewApp';
import NewView from '~/model/App/View/NewView';
import AppLayoutEdit from '~/components/App/Edit/AppLayoutEdit';
import Widget from '~/model/App/View/Widget';
import useViewContent from '~/hooks/App/useViewContent';
import Button from '~/components/common/Button/Button';
import Input from '~/components/common/Input/Input';
import Columns from '~/model/App/Columns';
import Column from '~/model/App/Column';
import Modal from '~/components/common/Modal';
import CircleButton from '~/components/common/Button/CircleButton';
import { FiX } from '@react-icons/all-files/fi/FiX';
import EditColumns from '~/components/App/Edit/EditColumns';

export default function Create() {
	const { app, update } = useApp(new NewApp({ ...NewApp.blank(), columns: [] }));
	const { table, onDragEnd, updateWidget, removeWidget } = useViewContent(app.columns);
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
		<AppLayoutEdit
			columns={app.columns}
			onDragEnd={onDragEnd}
			table={table}
			columnsEditForm={<EditColumns columns={app.columns} update={(columns: Columns) => update("columns", columns)} />}
			updateWidget={updateWidget}
			removeWidget={removeWidget}
		/>
	</>;
}
