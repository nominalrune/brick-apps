import { PageProps } from '~/types';
import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, Fragment, FormEventHandler, useContext } from 'react';
import Input from '~/components/common/Input';
import Button from '~/components/common/Button/Button';
import App from '~/model/App/App';
import AppIcon from '~/components/App/AppIcon';
import RecordForm from '~/components/Record/RecordForm';
import { MdSettings } from "@react-icons/all-files/md/MdSettings";
import { type ClientLoaderFunctionArgs, useLoaderData, useNavigate } from "@remix-run/react";
import RecordRepository from '~/repository/App/RecordRepository';
import FloatingAddButton from '~/components/common/Button/FloatingAddButton';
import useRecord from '~/hooks/App/useRecord';
import Record from '~/model/App/Record/Record';
import Column from '~/model/App/Column';
import AppContext from '~/contexts/AppContext';
import useAppContext from '~/contexts/useAppContext';
export default function Create() {
	const app = useAppContext();
	const navigate = useNavigate();

	const [record, setRecord] = useState(makeNewRecord(app.columns));
	function navigateAfterSubmit(record: Record, error?: { message: string; }) {
		if (error) {
			alert(error.message);
			return;
		}
		console.log('navigate to:', `/app/${app.code}/${app.view?.code}/${record.id}`)
		navigate(`/app/${app.code}/${app.view?.code}/${record.id}`);
	}
	return <RecordForm
		layout={app.view!.detail}
		record={record}
		afterSubmit={navigateAfterSubmit}
	/>;
}


function makeNewRecord(columns: Column[]): Record {
	const data: Record = columns.reduce((acc, column) => {
		acc[column.code] = "";
		return acc;
	}, {} as Record);
	return data;
}