import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import Palette from '~/components/App/Edit/Form/Palette';
import AppForm from '~/components/App/Edit/AppLayoutEdit';
// import { AppData } from '~/Models/App/App';
import AppEditHeader from '~/components/App/Edit/AppEditHeader';
import useApp from '~/hooks/App/useApp';
import { inputItems } from '~/model/App/View/InputTypes';
import AppInputData from '~/model/App/NewApp';
import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import Button from '~/components/common/Button/Button';
import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";

import AppRepository from '~/repository/App';
import AppEdit from '~/components/App/Edit/AppEdit';
async function getClientData(request: Request) {
	const repository = new AppRepository();
	const app = await repository.findByCode(request.param.code);
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
    return <AppEdit app={_app} view={_app.defaultView} />;
}
