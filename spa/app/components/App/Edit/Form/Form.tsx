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

	function handleConfigChange(setting: ViewItem) {
		if (!selectedInput || !setting) { return; }
		console.log({ setting });
		update(selectedInput.position, setting);
		setSelectedInput(undefined);
	}
	return <>
		<WidgetSettingModal
			inputData={selectedInput?.input}
			onClose={() => setSelectedInput(undefined)}
			onSubmit={handleConfigChange}
		/>
		{table.map((row, i) => <AppFormRow
			key={i}
			row={row}
			rowIndex={i}
			select={(param) => setSelectedInput(param)}
			remove={remove}
		/>)}
		<AppFormRow
			row={[]}
			rowIndex={table.length}
			select={(param) => setSelectedInput(param)}
			remove={remove}
		/>
	</>;
}