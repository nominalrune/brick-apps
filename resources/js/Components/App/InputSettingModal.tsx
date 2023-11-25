import { ChangeEvent, FormEventHandler, useReducer } from 'react';
import Modal from '../Modal';
import TextInput from '../TextInput';
import AppInput from '@/Models/App/AppInput';
import AppInputData from '@/Models/App/AppInputData';
import Button from '../Button';
import PrimaryButton from '../PrimaryButton';
export default function InputSettingModal({ inputData, onClose, onSubmit }: { inputData: AppInput | undefined, onClose: () => void, onSubmit: FormEventHandler<HTMLFormElement>; }) {
    if (!inputData) { return <></>; }
    return <Modal show={!!inputData} onClose={onClose}>
        <InputSettingForm inputData={inputData} close={onClose} onSubmit={onSubmit} />
    </Modal>;
}
function InputSettingForm({ inputData, close, onSubmit }: { inputData: AppInput, close: () => void, onSubmit: FormEventHandler<HTMLFormElement>; }) {
    const [state, reducer] = useReducer((state: AppInput, action: { key: keyof AppInputData, value: any; }) => {
        if (!state) { return inputData; }
        const newData = state.update(action.key, action.value);
        console.log("update", newData);
        return newData;
    }, inputData?.clone());

    function handleChange(e: ChangeEvent<Named<HTMLInputElement,keyof AppInputData>>) {
        const element = e.target;
        const value = element.type === 'checkbox' ? element.checked : element.value;
        reducer({ key: element.name, value });
    }

    return <form onSubmit={onSubmit} className='p-4 flex flex-col justify-start gap-4'>
        <label className="flex flex-col">入力タイプ: <select name={"type"} disabled value={state.type}>
            <option value="text">text</option>
            <option value="number">number</option>
            <option value="date">date</option>
            <option value="time">time</option></select>
        </label>
        <TextInput prefix="表示名: " name={"label"} type='text' onChange={handleChange} value={state.label} />
        <TextInput prefix='名前: ' name={"code"} type='text' onChange={handleChange} value={state.code} />
        <TextInput prefix='デフォルト値: ' name={"defaultValue"} type={inputData.type} onChange={handleChange} value={state.defaultValue} />

        <div className="flex gap-4">
            <label>
                プリフィックス: <TextInput name={"prefix"} type="text" onChange={handleChange} value={state.prefix} />
            </label>
            <label>
                サフィックス: <TextInput name={"suffix"} type="text" onChange={handleChange} value={state.suffix} />
            </label>
        </div>
        {/* <label className="flex flex-col">必須: <input name={"required"} type="checkbox" onChange={handleChange} checked={state.required} /></label> */}

        <input name="oldName" type="hidden" value={inputData.code} />
        <div className="flex gap-4">
            <PrimaryButton type='submit'>submit</PrimaryButton>
            <Button type='button' onClick={close}>cancel</Button>
        </div>
    </form>;
}
