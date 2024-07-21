import Widget from '~/model/App/View/Widget';
import Input from '../common/Input/Input';
import { ChangeEvent } from 'react';

export default function WidgetComponent({ value, widget, onChange }: { value: unknown, widget: Widget, onChange: (value: string | number | boolean | object) => void; }) {
	return <div className="flex flex-col gap-1">
		<label htmlFor={widget.code} className="text-sm text-slate-600">{widget.label}</label>
		{widget.type !== "reference" ? (
		// @ts-expect-error input "type" attribute does not behave properly when given variable
		<Input
			id={widget.code}
			type={widget.type}
			value={value}
			onChange={(e: ChangeEvent<HTMLInputElement> | { value: any, label: string; }) => 'target' in e ? onChange(e.target.value) : onChange(e.value)}
			options={widget.rules?.options ?? []}
			className="p-2 border border-slate-200 rounded-md"
		/>) : <Input
			id={widget.code}
			type={"text"}
			value={value}
			onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
			className="p-2 border border-slate-200 rounded-md"
		/>}
	</div>;
}