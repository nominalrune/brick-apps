import Position from '~/model/Position';
import ViewItem from '~/model/App/View/ViewItem';
import { useState, type FormEvent } from 'react';
import WidgetSettingModal from './Widget/WidgetSettingModal';
import AppFormRow from './Row';
interface Param {
	table: ViewItem[][],
	update: ([x, y]: Position, value: ViewItem) => void,
	remove: ([x, y]: Position) => void,
}

export default function AppForm({ table, update, remove }: Param) {
	const [selectedInput, setSelectedInput] = useState<{ position: Position, input: ViewItem; } | undefined>(undefined);

	function handleConfigChange(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!selectedInput) { return; }
		const form = e.currentTarget;
		if (!(form instanceof HTMLFormElement)) { return; }
		const { code, label, type, defaultValue, prefix, suffix } = Object.fromEntries((new FormData(form)).entries());
		const newInput = new ViewItem({
			...selectedInput.input.toJSON(),
			type,
			code,
			label,
			defaultValue,
			prefix,
			suffix,
		});
		console.log({ newInput });
		update(selectedInput.position, newInput);
		setSelectedInput(undefined);
	}
	const extraRow = <AppFormRow
		key={table.length + 1}
		row={[]}
		rowIndex={table.length + 1}
		select={(param) => setSelectedInput(param)}
		remove={remove}
	/>;
	const rows = table.map((row, i) => <AppFormRow
		key={i}
		row={row}
		rowIndex={i}
		select={(param) => setSelectedInput(param)}
		remove={remove}
	/>).concat(extraRow);
	return <>
		{selectedInput?.input && <WidgetSettingModal
			inputData={selectedInput.input}
			onClose={() => setSelectedInput(undefined)}
			onSubmit={handleConfigChange}
		/>}
		{rows}
	</>;
}