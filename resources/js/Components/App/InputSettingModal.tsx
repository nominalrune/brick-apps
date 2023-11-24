import { ChangeEvent, FormEventHandler, useReducer } from 'react';
import Modal from '../Modal';
import TextInput from '../TextInput';
import AppInput from '@/Models/App/InputData';
import Button from '../Button';
import PrimaryButton from '../PrimaryButton';
import IAppInput from '@/Models/App/AppInput';
import AppInputData from '@/Models/App/AppInputData';
export default function InputSettingModal({ inputData, onClose, onSubmit }: { inputData: AppInput | undefined, onClose: () => void, onSubmit: FormEventHandler<HTMLFormElement>; }) {
    if (!inputData) { return <></>; }
    return <Modal show={!!inputData} onClose={onClose}>
        <InputSettingForm inputData={inputData} close={onClose} onSubmit={onSubmit} />
    </Modal>;
}
function InputSettingForm({ inputData, close, onSubmit }: { inputData: AppInput, close: () => void, onSubmit: FormEventHandler<HTMLFormElement>; }) {
    const [state, reducer] = useReducer((state: AppInput, action: { key: "code" | "defaultValue" | "label" | "prefix" | "suffix" | "rules" | "referringAppName"|"type", value: any; }) => {
        if (!state) { return inputData; }
        console.log("before update",state);
        const newData = state.update(action.key, action.value)
        console.log("update",newData);
        return newData;
    }, inputData?.clone());

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
        <label className="flex flex-col">表示名: <TextInput name={"label"} type='text' onChange={handleChange} value={state.label} /></label>
        <label className="flex flex-col">名前: <TextInput name={"code"} type='text' onChange={handleChange} value={state.code} /></label>
        <label className="flex flex-col">デフォルト値: <TextInput name={"defaultValue"} type={inputData.type} onChange={handleChange} value={state.defaultValue} /></label>

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
