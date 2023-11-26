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
import { inputItems } from '@/Models/App/InputTypes';
import AppInputData from '@/Models/App/AppInputData';

export default function Edit({ auth, app }: PageProps & { app: AppData; }) {
    console.log({ app });
    const { table, update, remove, onDragEnd } = useDnDAppEditor("palette", inputItems, app.form);
    const { data, setData, transform, reset, errors, post, processing } = useForm({
        name: app.name,
        code: app.code,
        description: app.description,
        icon: app.icon,
        ...table.toDTO()
    });
    function handleChange(e: ChangeEvent<Named<HTMLInputElement, Exclude<keyof AppData, "id">>>) {
        setData(e.target.name, e.target.value);
    }
    function handleCancel() {
        window.history.back();
    }
    async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
        const form = table.toDTO();
        console.log(form);
        if (!confirm("アプリを更新しますか？")) { return; }
        transform(data => ({ // TODO ここの更新がうまく行かない
            ...data,
            ...form
        }));
        post(`/app/${app.code}/edit`,{onBefore:(e)=>{console.log("data",e.data)}});
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
                    <Palette items={inputItems} name="palette" />
                </div>
                <div className='col-span-3 flex flex-col'>
                    <AppForm table={table.form} update={update} remove={remove} />
                </div>
            </div>
        </DragDropContext>
    </AuthenticatedLayout>;
}
