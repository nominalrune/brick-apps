import Api from '~/lib/api/Api';
import { useState } from 'react';
import { is } from 'typia';
import App from '~/model/App/App';
import Record from '~/model/App/Record/Record';
import ErrorResponse from '~/types/ErrorResponse';


export default function useRecord(initialState: Record, app: App) {
	const [record, setRecord] = useState(initialState);
	const [errors, setErrors] = useState<{ name: string, message: string; }[]>([]);
	const [processing, setProcessing] = useState(false);
	const [message, setMessage] = useState('');
	const api = new Api();
	function update(key: string, value: any) {
		setRecord({ ...record, [key]: value });
	}
	async function submit() {
		setProcessing(true);
		const url = record?.id ? `/app/${app.code}/${app.view.code}/${record.id}` : `/app/${app.code}/${app.view.code}`;
		return await api.post(url, record).then((response) => {
			const data = response;
			console.log(`create finished with data:`, data)
			if (is<ErrorResponse>(data)) {
				setMessage(data.message);
				setErrors(data.errors);
				console.log('error', data);
				return;
			}
				setRecord(data);
				console.log('record updated', data);

		}).finally(() => {
			setProcessing(false);
		});
	}
	return {
		record,
		update,
		processing,
		errors,
		message,
		submit,
	};
}