import { useState } from 'react';
import initialize from './initialize';
import { InputAttribute, InputDataType } from '@/types/commonTypes';

export default function useFormState<T extends readonly InputAttribute[]>(properties: T) {
	const [data, _setData] = useState(initialize(properties));
	function setData<M extends number>(
		key: T[M]['name'],
		value: InputDataType<T[M]>,
	) {
		_setData(data => ({ ...data, [key]: value }));
	}
	return [data, setData] as const;
}