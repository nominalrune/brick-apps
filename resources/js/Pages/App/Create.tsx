import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState } from 'react';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import InputSettingModal from '@/Components/App/InputSettingModal';
import AppInput from '@/Models/App/InputData';
import Address from '@/Models/Address';
import useInputsTable from '@/Models/useInputTable';
import Palette from '@/Components/App/Pallete';
import AppForm from '@/Components/App/AppForm';
import TextInput from '@/Components/TextInput';
import Button from '@/Components/Button';
import PrimaryButton from '@/Components/PrimaryButton';
import AppCreateService from '@/services/AppCreateService';


const paletteItems = ["text", "number", "date", "time", "checkbox", "color"];


export default function Create({ auth }: PageProps) {
    const _count = useRef(1);
    function count() { return _count.current += 1; }
    const { table, get, insert, move, update, remove } = useInputsTable(1);

    const { data, setData, transform, reset, errors, post, processing } = useForm({
        appName: "新しいアプリ",
        appCode: "new_app",
        description: "説明をここに書く",
        icon: "1",
        form: [] as AppInput<"text", "varchar">[][],
        formKeys: [] as string[],
    });
    function onDragEnd({ draggableId, destination, source }: DropResult) {
        console.log({ draggableId, destination, source });
        if (!destination || destination.droppableId === "palette") {
            return;
        }
        const destRow = Number(destination.droppableId);
        const destCol = destination.index;
        if (source.droppableId === "palette") {
            insert([destRow, destCol], new AppInput(paletteItems[source.index], paletteItems[source.index] + "-" + count()));
            return;
        }
        const sourceRow = Number(source.droppableId);
        const sourceCol = source.index;
        if (!isFinite(destRow) || !isFinite(sourceRow)) { return; }
        if (destRow === sourceRow && destCol === sourceCol) {
            return;
        }
        move([sourceRow, sourceCol], [destRow, destCol]);
    }
    async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
        const _confirm = confirm("アプリを作成しますか？");
        if (!_confirm) { return; }
        // const service = new AppCreateService();
        // const result = await service.createApp(appName, appCode, "", table);
        // console.log(result);
        transform(data=>({
            ...data,
            form:table,
            formKeys:table.flat().map(form=>form.code),
        }))
        post("/app/create");
    }
    function handleCancel() {
        window.history.back();
    }
    return <AuthenticatedLayout
        user={auth.user}
        header={<div className='flex gap-4 items-end'>
            <TextInput label="アイコン" type="text" name="app-icon" className='max-w-6' value={data.icon} onChange={e => { setData("icon", e.target.value); }} />
            <TextInput label="アプリ名" type="text" name="app-name" className='text-3xl' value={data.appName} onChange={e => { setData("appName", e.target.value); }} />
            <TextInput label="アプリコード" type="text" name="app-code" value={data.appCode} onChange={e => { setData("appCode", e.target.value); }} />
            <div className='flex-grow flex gap-4 justify-end'>
                <PrimaryButton type="button" onClick={handleSubmit}>作成</PrimaryButton>
                <Button type="button" onClick={handleCancel}>キャンセル</Button>
            </div>
        </div>}
    >
        <Head title="create new app" />
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 h-screen">
                <div className='col-span-1 bg-white'>
                    <Palette items={paletteItems} />
                </div>
                <div className='col-span-3 flex flex-col'>
                    <AppForm table={table} update={update} remove={remove} />
                </div>
            </div>
        </DragDropContext>
    </AuthenticatedLayout>;
}
