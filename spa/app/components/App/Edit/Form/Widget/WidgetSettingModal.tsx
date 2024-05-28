import { ChangeEvent, FormEventHandler, useReducer } from 'react';
import Modal from '~/components/common/Modal';
import Input from '~/components/common/Input';
import ViewItem from '~/model/App/View/ViewItem';
import ViewItemData from '~/model/App/View/ViewItemData';
import Button from '~/components/common/Button/Button';
import { inputItems } from '~/model/App/View/InputTypes';
import DotKeyOf from '~/types/DotKeyOf';
export default function WidgetSettingModal({ inputData, onClose, onSubmit }: { inputData: ViewItem | undefined, onClose: () => void, onSubmit: FormEventHandler<HTMLFormElement>; }) {
	const [state, reducer] = useReducer((state: ViewItem, action: { key: DotKeyOf<ViewItemData>, value: any; }) => {
		if (!state) { return inputData; }
		const newData = state.with(action.key, action.value);
		console.log("update", newData);
		return newData;
	}, inputData?.clone());

	function handleChange(e: ChangeEvent<Named<HTMLInputElement, DotKeyOf<ViewItemData>>>) {
		const element = e.target;
		const value = element.type === 'checkbox' ? element.checked : element.value;
		reducer({ key: element.name, value });
	}

	return <Modal show={!!inputData} close={onClose}>
		<form onSubmit={onSubmit} className='bg-white rounded my-0 mx-auto  p-4 flex flex-col justify-start gap-4'>
			<Input id='入力タイプ' prefix="入力タイプ: " name="type" type="select" value={state.type} onChange={handleChange} options={inputItems.map(i => [i])} />
			<Input id='表示名' prefix="表示名: " name={"label"} type='text' onChange={handleChange} value={state.label} />
			<Input id='名前' prefix='名前: ' name={"code"} type='text' onChange={handleChange} value={state.code} />
			<div className="flex gap-4">
				{/* <Input label="選択肢" name={"rules.options"} type="text" onChange={handleChange} value={state.prefix} /> */}
			</div>
			<Input prefix='デフォルト値: ' name={"defaultValue"} type={state.type} onChange={handleChange} value={state.defaultValue} />

			<div className="flex gap-4">
				<Input id='プリフィックス' prefix="プリフィックス: " name={"prefix"} type="text" onChange={handleChange} value={state.prefix} />
				<Input id='サフィックス' prefix="サフィックス: " name={"suffix"} type="text" onChange={handleChange} value={state.suffix} />
			</div>
			<input name="oldName" type="hidden" value={inputData.code} />
			<div className="flex gap-4">
				<button type='submit'>ok</button>
				<Button type='button' onClick={close}>cancel</Button>
			</div>
		</form></Modal>;
}
