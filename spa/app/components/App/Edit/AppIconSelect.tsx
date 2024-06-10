import { Fragment } from 'react';
import Input from '../../common/Input';
const icons = [
	"/icons/calendar.svg",
	"/icons/diagnosis.svg",
	"/icons/record.svg",
	"/icons/shopping.svg",
];
interface Props{
	value: string;
	name: string;
	label?: string;
	onChange: ({ value, label }: { value: any, label: string; }) => void;
	className?: string;

}
export default function AppIconSelect({ value, name, label, onChange, className }: Props) {
	return <Input
		label={label ?? ""}
		id='icon'
		type="select"
		name={name}
		className={className}
		value={value}
		onChange={onChange}
		options={icons.map((url) => (
			[
				<Fragment key={url}><img src={url} className="w-6 h-6" /></Fragment>,
				url
			] as const))}
	/>;
}
