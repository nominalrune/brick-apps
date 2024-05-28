import { ChangeEvent, FormEventHandler, useReducer } from 'react';
import Modal from '~/components/common/Modal';
import Input from '~/components/common/Input';
import ViewItem from '~/model/App/View/ViewItem';
import ViewItemData from '~/model/App/View/ViewItemData';
import Button from '~/components/common/Button/Button';
import { inputItems } from '~/model/App/View/InputTypes';
import DotKeyOf from '~/types/DotKeyOf';

interface Props {
	inputData: ViewItem|undefined;
	onClose: () => void;
	onSubmit: FormEventHandler<HTMLFormElement>;
}
export default function WidgetSettingModal({ inputData, onClose, onSubmit }: Props) {
	const [state, reducer] = useReducer((state: ViewItem, action: { key: DotKeyOf<ViewItemData>, value: any; }) => {
		if (!state ) { return inputData; }
		// console.log({ action });
		const newData = state.with(action.key, action.value);
		// console.log("update", newData);
		return newData;
	}, inputData?.clone() ?? ViewItem.blank());

	function handleChange(e: ChangeEvent<Named<HTMLInputElement, DotKeyOf<ViewItemData>>>) {
		const element = e.target;
		const value = element.type === 'checkbox' ? element.checked : element.value;
		reducer({ key: element.name, value });
	}

	return <Modal show={!!inputData} close={onClose}>
		<form onSubmit={onSubmit} className='bg-white rounded-lg my-0 mx-auto  p-4 flex flex-col justify-start gap-4'>
			{inputData && <>
				<Input id='type' prefix="入力タイプ: " name="type" type="select" value={state.type} onChange={handleChange} options={inputItems.map(i => [i])} />
				<Input id='label' prefix="表示名: " name={"label"} type='text' onChange={handleChange} value={state.label} />
				<Input id='code' prefix='名前: ' name={"code"} type='text' onChange={handleChange} value={state.code} />
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
					<Button type='submit'>ok</Button>
					<Button type='button' onClick={close}>cancel</Button>
				</div></>}
		</form>
	</Modal>;
}
