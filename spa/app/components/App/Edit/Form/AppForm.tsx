import Position from '~/model/Position';
import Widget from '~/model/App/View/Widget';
import { useState, type FormEvent } from 'react';
import WidgetSettingModal from './Widget/WidgetSettingModal';
import AppFormRow from './Row';
import View from '~/model/App/View/View';
import NewView from '~/model/App/View/NewView';
interface Param {
	table: NewView,
	update: ([x, y]: Position, value: Widget) => void,
	remove: ([x, y]: Position) => void,
}

export default function AppForm({ table, update, remove }: Param) {
	const [selectedInput, setSelectedInput] = useState<{ position: Position, input: Widget; } | undefined>(undefined);

	function handleConfigChange(setting: Widget) {
		if (!selectedInput || !setting) { return; }
		// console.log({ setting });
		update(selectedInput.position, setting);
		setSelectedInput(undefined);
	}
	return <>
		<WidgetSettingModal
			inputData={selectedInput?.input}
			onClose={() => setSelectedInput(undefined)}
			onSubmit={handleConfigChange}
		/>
		{table.detail.map((row, i) => <AppFormRow
			key={i}
			row={row}
			rowIndex={i as number}
			select={(param) => setSelectedInput(param)}
			remove={remove}
		/>)}
		<AppFormRow
			row={[]}
			rowIndex={table.detail.content.length}
			select={(param) => setSelectedInput(param)}
			remove={remove}
		/>
	</>;
}