// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { PageProps } from '@/types';
// import { Head, useForm } from '@inertiajs/react';
// import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
// import AppInput from '@/Models/App/AppInput';
// import Palette from '@/Components/App/Palette';
// import AppForm from '@/Components/App/AppForm';
// import useDnDAppEditor from '@/Hooks/useDnDAppEditor';
// import { inputItems } from '@/Models/App/InputTypes';
// import AppEditHeader from '@/Components/App/AppEditHeader';
// import { DragDropContext } from 'react-beautiful-dnd';
// import App, { AppData } from '@/Models/App/App';

export default function Create({ auth }:any) {
	return <></>
    // const { table, update, remove, onDragEnd } = useDnDAppEditor("palette", inputItems);

    // const { data, setData, transform, reset, errors, post, processing } = useForm({
    //     name: "新しいアプリ",
    //     code: "",
    //     description: "説明をここに書く",
    //     icon: "1",
    //     ...table.toDTO()
    // });
    // // const { data, setData, transform, reset, errors, post, processing } = useForm(new App(undefined,"","新しいアプリ","説明をここに書く","0",table));
    // function handleChange(e: ChangeEvent<Named<HTMLInputElement,Exclude<keyof AppData,"id">>>) {
    //     setData(e.target.name, e.target.value);
    // }
    // async function handleSubmit(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
    //     console.log(table.toDTO())
    //     const _confirm = confirm("アプリを作成しますか？");
    //     if (!_confirm) { return; }
    //     transform(data => ({
    //         ...data,
    //         ...table.toDTO()
    //     }));
    //     post("/app/create", {onBefore:(e)=>{console.log("data",e.data)}});
    // }
    // function handleCancel() {
    //     window.history.back();
    // }
    // return <AuthenticatedLayout
    //     user={auth.user}
    //     header={
    //         <AppEditHeader
    //             submitLabel={"作成"}
    //             data={data}
    //             onChange={handleChange}
    //             onCancel={handleCancel}
    //             onSubmit={handleSubmit}
    //         />
    //     }
    // >
    //     <Head title="create new app" />
    //     {errors&&<div>{Object.entries(errors).map(([key,msg])=>(<div key={key} className="text-red-600">{key}:{msg}</div>))}</div>}
    //     <DragDropContext onDragEnd={onDragEnd}>
    //         <div className="grid grid-cols-4 h-screen">
    //             <div className='col-span-1 bg-white'>
    //                 <Palette items={inputItems} name="palette" />
    //             </div>
    //             <div className='col-span-3 flex flex-col'>
    //                 <AppForm table={table.form} update={update} remove={remove} />
    //             </div>
    //         </div>
    //     </DragDropContext>
    // </AuthenticatedLayout>;
}
