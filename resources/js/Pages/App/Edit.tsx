import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import Palette from '@/Components/App/Palette';
import AppForm from '@/Components/App/AppForm';
import { AppData } from '@/Models/App/App';
import AppEditHeader from '@/Components/App/AppEditHeader';
import useDnDAppEditor from '@/Hooks/useDnDAppEditor';
import { paletteItems } from '@/Models/App/InputTypes';
import AppInputData from '@/Models/App/AppInputData';

export default function Edit({ auth, app }: PageProps & { app: AppData; }) {
    const { table, update, remove, onDragEnd } = useDnDAppEditor("palette", paletteItems);
    const { data, setData, transform, reset, errors, post, processing } = useForm({
        name: app.name,
        code: app.code,
        description: app.description,
        icon: app.icon,
        form: app.form,
        form_keys: app.form_keys,
    });
    function handleChange(e: ChangeEvent<Named<HTMLInputElement,Exclude<keyof AppData,"id">>>) {
        setData(e.target.name, e.target.value);
    }
    function handleCancel() {
        window.history.back();
    }
    async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
        if (!confirm("アプリを更新しますか？")) { return; }
        transform(data => ({
            ...data,
            form: table,
            formKeys: table.flat().map(form => form.code),
        }));
        post(`/app/${app.code}/edit`);
    }

    return <AuthenticatedLayout
        user={auth.user}
        header={
            <AppEditHeader
                submitLabel={"更新"}
                data={data}
                onChange={handleChange}
                onCancel={handleCancel}
                onSubmit={handleSubmit} />
        }
    >
        <Head title={"edit app: " + data.name} />
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
