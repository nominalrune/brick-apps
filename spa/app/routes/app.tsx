import {
	ClientLoaderFunctionArgs,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useLocation,
	useNavigate,
} from "@remix-run/react";

import NavBar from "~/components/layouts/NavBar";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/index.css?url";

import Contexts from '../contexts/Contexts';
import { createContext } from 'react';
import App from '~/model/App/App';
import { Layout } from '~/root';
import RecordRepository from '~/repository/App/RecordRepository';
import WithoutMethods from '~/model/common/WithoutMethods';
import NewApp from '~/model/App/NewApp';
import AppContext from '~/contexts/AppContext';

async function getClientData(code: string) {
	const repository = new RecordRepository(code);
	const app = await repository.get();
	return app;
}

export async function clientLoader({
	request,
	params
}: ClientLoaderFunctionArgs) {
	if (params.code === undefined) { throw new Error('code is required'); }
	const clientData = await getClientData(params.code);
	return clientData;
}
export default function AppLayout() {
	const app = new App(useLoaderData<typeof getClientData>() as WithoutMethods<App>);

	return (
		<AppContext.Provider value={app}>
			<Outlet />
		</AppContext.Provider>
	);
}