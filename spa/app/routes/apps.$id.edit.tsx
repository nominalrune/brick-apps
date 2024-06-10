import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import Palette from '~/components/App/Edit/Form/Palette';
import AppForm from '~/components/App/Edit/AppLayoutEdit';
// import { AppData } from '~/Models/App/App';
import AppEditHeader from '~/components/App/Edit/AppEditHeader';
import useAppEditor from '~/hooks/App/useAppEditor';
import { inputItems } from '~/model/App/View/InputTypes';
import AppInputData from '~/model/App/NewApp';
import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import Button from '~/components/common/Button/Button';
import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";

import AppRepository from '~/repository/App';
async function getClientData(request: Request) {
	const repository = new AppRepository();
	const app = await repository.find(request.param.id);
	return app;
}

export async function clientLoader({
	request,
}: ClientLoaderFunctionArgs) {
	const clientData = await getClientData(request);
	return clientData;
}

export default function Edit() {
	const _app = useLoaderData<typeof clientLoader>();
    const { app, update, } = useAppEditor(_app);
    // const { data, setData, transform, delete:destroy, errors, post, processing } = useForm({
    //     name: app.name,
    //     code: app.code,
    //     description: app.description,
    //     icon: app.icon,
    //     ...table.toJSON()
    // });
    function handleChange(e: ChangeEvent<Named<HTMLInputElement, Exclude<keyof AppData, "id">>>) {
        setData(e.target.name, e.target.value);
    }
    function handleCancel() {
        window.history.back();
    }
    async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
        const form = table.toJSON();
        console.log(form);
        if (!confirm("アプリを更新しますか？")) { return; }
        transform(data => ({ // TODO ここの更新がうまく行かない
            ...data,
            ...form
        }));
        post(`/app/${app.code}/edit`,{onBefore:(e)=>{console.log("data",e.data)}});
    }

    function handleDelete() {
        if (!confirm("本当に削除しますか？")) { return; }
        destroy(`/app/${app.code}`);
    }
    return <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 h-screen">
                <div className='col-span-1 bg-white'>
                    <Palette items={inputItems} name="palette" />
                </div>
                <div className='col-span-3 flex flex-col'>
                    <AppForm table={table.content} update={update} remove={remove} />
                </div>
            </div>
        </DragDropContext>
}
