import { ChangeEvent, FormEventHandler, useEffect, useReducer, useState } from 'react';
import Modal from '~/components/common/Modal';
import Input from '~/components/common/Input';
import Widget from '~/model/App/View/Widget';
import ViewItemData from '~/model/App/View/ViewItemData';
import Button from '~/components/common/Button/Button';
import { inputItems } from '~/model/App/View/InputTypes';
import DotKeyOf from '~/types/DotKeyOf';
import View from '~/model/App/View/View';

interface Props {
	inputData: Widget | undefined;
	onClose: () => void;
	onSubmit: (viewItem: Widget) => void;
}
/** inputDataに値が入っていたらモーダル表示。入っていなかったら隠す。 */
export default function WidgetSettingModal({ inputData, onClose, onSubmit }: Props) {
	const [setting, setSetting] = useState<Widget | undefined>();
	useEffect(() => {// アニメーションのために100msの猶予をおいてから値を切り替え
		const id = setTimeout(() => {
			setSetting(inputData?.clone());
		}, 100);
		return () => clearTimeout(id);
	}, [inputData]);

	function handleChange(e: ChangeEvent<Named<HTMLInputElement | HTMLSelectElement, string>>) {
		console.log('handleChange', { e });
		const element = e.target;
		const name = element.name as keyof Widget<any>;
		const value = (element instanceof HTMLInputElement && element.type === 'checkbox') ? element.checked : element.value;
		setSetting(setting => { const v = setting?.with(name, value); console.log(v?.prefix); return v; });
	}
	function handleClose() {
		onClose();
	}

	return <Modal show={!!inputData} close={handleClose}>
		{setting && <div className='bg-white rounded-lg my-0 mx-auto  p-4 flex flex-col justify-start gap-4'>
			<Input id='type'
				prefix="入力タイプ: "
				type="select"
				value={setting.type}
				onChange={handleChange}
				options={inputItems.map(i => [i, i])}
			/>
			<Input id='label' prefix="表示名: " name={"label"} type='text' onChange={handleChange} value={setting.label} />
			<Input id='code' prefix='名前: ' disabled={true} name={"code"} type='text' onChange={handleChange} value={setting.code} />
			<div className="flex gap-4">
				{/* <Input label="選択肢" name={"rules.options"} type="text" onChange={handleChange} value={setting.prefix} /> */}
			</div>
			<Input prefix='デフォルト値: ' id={"defaultValue"} type={setting.type || "text"} onChange={handleChange} value={setting.defaultValue} />

			<div className="flex gap-4">
				<Input id='prefix' prefix="プリフィックス: " name={"prefix"} type="text" onChange={handleChange} value={setting.prefix} />
				<Input id='suffix' prefix="サフィックス: " name={"suffix"} type="text" onChange={handleChange} value={setting.suffix} />
			</div>
			<input name="oldName" type="hidden" value={setting.code} />
			<div className="flex gap-4">
				<Button type='submit' onClick={() => onSubmit(setting)}>ok</Button>
				<Button type='button' onClick={onClose}>cancel</Button>
			</div>
		</div>}
	</Modal>;
}
