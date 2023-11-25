import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import AppInput from '@/Models/App/AppInput';
import Palette from '@/Components/App/Palette';
import AppForm from '@/Components/App/AppForm';
import useDnDAppEditor from '@/Hooks/useDnDAppEditor';
import { paletteItems } from '@/Models/App/InputTypes';
import AppEditHeader from '@/Components/App/AppEditHeader';
import { DragDropContext } from 'react-beautiful-dnd';
import { AppData } from '@/Models/App/App';

export default function Create({ auth }: PageProps) {
    const { table, update, remove, onDragEnd } = useDnDAppEditor("palette", paletteItems);

    const { data, setData, transform, reset, errors, post, processing } = useForm({
        name: "新しいアプリ",
        code: "new_app",
        description: "説明をここに書く",
        icon: "1",
        form: [] as AppInput[][],
        form_keys: [] as string[],
    });
    function handleChange(e: ChangeEvent<Named<HTMLInputElement,Exclude<keyof AppData,"id">>>) {
        setData(e.target.name, e.target.value);
    }
    async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
        const _confirm = confirm("アプリを作成しますか？");
        if (!_confirm) { return; }
        transform(data => ({
            ...data,
            form: table,
            form_keys: table.flat().map(form => form.code),
        }));
        post("/app/create");
    }
    function handleCancel() {
        window.history.back();
    }
    return <AuthenticatedLayout
        user={auth.user}
        header={
            <AppEditHeader
                submitLabel={"作成"}
                data={data}
                onChange={handleChange}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />
        }
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
