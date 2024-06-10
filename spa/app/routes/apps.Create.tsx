import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import useAppEditor from '~/hooks/App/useAppEditor';
import AppEditHeader from '~/components/App/Edit/AppEditHeader';
import AppRepository from '~/repository/App';
import NewApp from '~/model/App/NewApp';
import Named from '~/lib/react-structured-form/src/types/Named';
import NewView from '~/model/App/View/NewView';
import AppLayoutEdit from '~/components/App/Edit/AppLayoutEdit';
import Widget from '~/model/App/View/Widget';
import useViewLayout from '~/hooks/App/useViewLayout';
import Button from '~/components/common/Button/Button';
import Input from '~/components/common/Input/Input';
import Fields from '~/model/App/FIelds';
import Field from '~/model/App/Field';
import Modal from '~/components/common/Modal';
import CircleButton from '~/components/common/Button/CircleButton';
import { FiX } from '@react-icons/all-files/fi/FiX';

export default function Create() {
	const { app, update } = useAppEditor(new NewApp({ ...NewApp.blank(), fields: [] }));
	const { table, onDragEnd, updateWidget, removeWidget } = useViewLayout(app.fields);
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
			fields={app.fields}
			onDragEnd={onDragEnd}
			table={table}
			fieldsEditForm={<EditField fields={app.fields} update={(fields: Fields) => update("fields", fields)} />}
			updateWidget={updateWidget}
			removeWidget={removeWidget}
		/>
	</>;
}

function EditField({ fields, update }: { fields: Fields; update: (fields: Fields) => void; }) {
	const [show, setShow] = useState(false);
	return <div className='grid'>
		<Button onClick={() => setShow(!show)} className='m-1 rounded border-2 border-emerald-400 bg-slate-300 hover:bg-slate-400'>{show ? "閉じる" : "カラムの変更"}</Button>
		<Modal show={show} close={() => setShow(false)}>
			<div className='bg-white rounded p-3 flex flex-col'>
				<div className='contents'>
					{fields.map((field, i) => field ? <div className='flex border-b last:border-b-0 p-2 items-baseline' key={field.code}>
						<Input
							id={field.code + "code"}
							label={"code"}
							type='text'
							value={field.code}
							name={field.code + "code"}
							onChange={(e) => { update(fields.map((f, j) => (f && f.code === field.code) ? { ...f, code: e.target.value } : f)); }}
						/>
						<Input
							id={field.code + "valueType"}
							label={"valueType"}
							value={field.valueType}
							name={field.code + "valueType"}
							onChange={({ value, label }) => { update(fields.map((f, j) => (f && f.code === field.code) ? { ...f, valueType: value } : f)); }}
							type={"select"}
							options={[["varchar", "varchar"], ["int", "int"], ["text", "text"], ["date", "date"], ["datetime", "datetime"], ["time", "time"], ["boolean", "boolean"]]}
						/>
						<CircleButton onClick={() => { update(fields.map((f, j) => (f && f.code === field.code) ? null : f)); }}><FiX /></CircleButton>
					</div> : <></>)}
				</div>
				<Button onClick={() => { update([...fields, { code: "", valueType: "varchar" }]); }}>+</Button>
				<div className="flex gap-2 justify-end">
					<Button onClick={() => { setShow(false); }} className='m-1 rounded bg-blue-300 hover:bg-blue-400'>閉じる</Button>
				</div>
			</div>
		</Modal>
	</div>;
}