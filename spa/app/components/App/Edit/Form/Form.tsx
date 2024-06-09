import Position from '~/model/Position';
import Widget from '~/model/App/View/Widget';
import { useState, type FormEvent } from 'react';
import WidgetSettingModal from './Widget/WidgetSettingModal';
import AppFormRow from './Row';
interface Param {
	table: Widget[][],
	update: ([x, y]: Position, value: Widget) => void,
	remove: ([x, y]: Position) => void,
}

export default function AppForm({ table, update, remove }: Param) {
	const [selectedInput, setSelectedInput] = useState<{ position: Position, input: Widget; } | undefined>(undefined);

	function handleConfigChange(setting: Widget) {
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