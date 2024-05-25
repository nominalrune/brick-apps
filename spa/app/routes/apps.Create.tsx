import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import AppInput from '~/model/App/AppInput';
import Palette from '~/components/App/Palette';
import AppForm from '~/components/App/AppForm';
import useDnDAppEditor from '~/hooks/useDnDAppEditor';
import { inputItems } from '~/model/App/View/InputTypes';
import AppEditHeader from '~/components/App/AppEditHeader';
import { DragDropContext } from 'react-beautiful-dnd';
import App from '~/model/App/App';
import AppRepository from '~/repository/App';
import NewApp from '~/model/App/NewApp';
import Named from '~/lib/react-structured-form/src/types/Named';
import NewView from '~/model/App/View/NewView';

export default function Create({ auth }: any) {
	// return <></>
	const { table, update, remove, onDragEnd } = useDnDAppEditor("palette", inputItems);
	const [newApp, setNewApp] = useState(NewApp.blank());
	const [newView, setNewView] = useState(NewView.blank());
	const repo = new AppRepository();
	// const { data, setNewApp, transform, reset, errors, post, processing } = useForm(new App(undefined,"","新しいアプリ","説明をここに書く","0",table));
	function handleAppChange(e: ChangeEvent<Named<HTMLInputElement, keyof NewApp>>) {
		setNewApp(new NewApp({ ...newApp, [e.target.name]: e.target.value }));
	}
	function handleViewChange(e: ChangeEvent<Named<HTMLInputElement, keyof NewView>>) {
		setNewView(new NewView({ ...newView, [e.target.name]: e.target.value }));
	}
	async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
		console.log(table.toJSON());
		const _confirm = confirm("アプリを作成しますか？");
		if (!_confirm) { return; }
		const res = await repo.create(newApp);

	}
	function handleCancel() {
		window.history.back();
	}
	return <>
		<AppEditHeader
			submitLabel={"作成"}
			data={newApp}
			onChange={handleAppChange}
			onCancel={handleCancel}
			onSubmit={handleSubmit}
		/>
		{/* {errors && <div>{Object.entries(errors).map(([key, msg]) => (<div key={key} className="text-red-600">{key}:{msg}</div>))}</div>} */}
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="grid grid-cols-4 h-screen">
				<div className='col-span-1 bg-white'>
					<Palette items={inputItems} name="palette" />
				</div>
				<div className='col-span-3 flex flex-col'>
					form
					<AppForm table={table.form} update={update} remove={remove} />
				</div>
			</div>
		</DragDropContext>
	</>;
}
