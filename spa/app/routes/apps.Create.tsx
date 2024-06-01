import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import useDnDAppEditor from '~/hooks/App/useDnDAppEditor';
import AppEditHeader from '~/components/App/Edit/AppEditHeader';
import AppRepository from '~/repository/App';
import NewApp from '~/model/App/NewApp';
import Named from '~/lib/react-structured-form/src/types/Named';
import NewView from '~/model/App/View/NewView';
import AppLayout from '~/components/App/Edit';
import ViewItem from '~/model/App/View/ViewItem';

export default function Create() {
	// return <></>
	const layoutState = useDnDAppEditor(
		new NewApp({...NewApp.blank(), fields:[{valueType:"text",code:"name"}]}),
		// 	[
		// 	 {valueType:"text",...new ViewItem({code:"名前",label:"名前",type:"text",defaultValue:"",prefix:"",suffix:""})},
		// 	 {valueType:"text", ...new ViewItem({code:"都道府県",label:"都道府県",type:"text",defaultValue:"",prefix:"",suffix:""})},
		// ],
		[]);
	// const [newView, setNewView] = useState(NewView.blank());
	const repo = new AppRepository();
	// const { data, setNewApp, transform, reset, errors, post, processing } = useForm(new App(undefined,"","新しいアプリ","説明をここに書く","0",table));
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
		<AppLayout {...layoutState} />
	</>;
}
