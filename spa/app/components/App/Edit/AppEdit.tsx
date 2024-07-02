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
import handleCancel from './actions/handleCancel';
import handleSubmit from './actions/handleSubmit';
import getHandleAppChange from './actions/getHandleAppChange';

type Prop = {
	app: NewApp | null;
	view: NewView | null;
} | {
	app: App;
	view: View;
};
export default function AppEdit({ app: _app }: Prop) {
	const {
		app,
		updateApp,
		updateWidget,
		removeWidget,
		onDragEnd,
		save
	} = useApp(_app ?? NewApp.blank());
	function handleAppChange(name: string, value: string) {
		if (name !== "name" && name !== "description" && name !== "icon" && name !== 'code') return;
		updateApp(name, value);
	}
	async function handleSubmit() {
		save();

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
			onSubmit={() => handleSubmit()}
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

