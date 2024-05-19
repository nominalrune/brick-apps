import { ChangeEvent, FormEventHandler, useReducer } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import ViewItem from '~/model/App/View/ViewItem';
import ViewItemData from '~/model/App/View/ViewItemData';
import Button from '../common/Button/Button';
import { inputItems, valueTypeItems } from '~/model/App/View/InputTypes';
export default function InputSettingModal({ inputData, onClose, onSubmit }: { inputData: ViewItem | undefined, onClose: () => void, onSubmit: FormEventHandler<HTMLFormElement>; }) {
    if (!inputData) { return <></>; }
    return <Modal show={!!inputData} onClose={onClose}>
        <InputSettingForm inputData={inputData} close={onClose} onSubmit={onSubmit} />
    </Modal>;
}
function InputSettingForm({ inputData, close, onSubmit }: { inputData: ViewItem, close: () => void, onSubmit: FormEventHandler<HTMLFormElement>; }) {
    const [state, reducer] = useReducer((state: ViewItem, action: { key: DotKeyOf<ViewItemData>, value: any; }) => {
        if (!state) { return inputData; }
        const newData = state.update(action.key, action.value);
        console.log("update", newData);
        return newData;
    }, inputData?.clone());

    function handleChange(e: ChangeEvent<Named<HTMLInputElement, DotKeyOf<ViewItemData>>>) {
        const element = e.target;
        const value = element.type === 'checkbox' ? element.checked : element.value;
        reducer({ key: element.name, value });
    }

    return <form onSubmit={onSubmit} className='p-4 flex flex-col justify-start gap-4'>
        <Input prefix="入力タイプ: " name="type" type="select" value={state.type} onChange={handleChange} options={inputItems.map(i => [i])} />
        <Input prefix="表示名: " name={"label"} type='text' onChange={handleChange} value={state.label} />
        <Input prefix='名前: ' name={"code"} type='text' onChange={handleChange} value={state.code} />
        <div className="flex gap-4">
            {/* <Input label="選択肢" name={"rules.options"} type="text" onChange={handleChange} value={state.prefix} /> */}
        </div>
        <Input prefix='デフォルト値: ' name={"defaultValue"} type={state.type} onChange={handleChange} value={state.defaultValue} />

        <div className="flex gap-4">
            <Input prefix="プリフィックス: " name={"prefix"} type="text" onChange={handleChange} value={state.prefix} />
            <Input prefix="サフィックス: " name={"suffix"} type="text" onChange={handleChange} value={state.suffix} />
        </div>
        <input name="oldName" type="hidden" value={inputData.code} />
        <div className="flex gap-4">
            <utton type='submit'>ok</utton>
            <Button type='button' onClick={close}>cancel</Button>
        </div>
    </form>;
}
