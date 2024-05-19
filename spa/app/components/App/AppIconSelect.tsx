import { ChangeEventHandler, ReactNode } from 'react';
import Input from '../common/Input';
const icons = [
	"calendar.svg",
	"diagnosis.svg",
	"record.svg",
	"shopping.svg",
];
export default function AppIconSelect({ value, name, label, onChange, className }: { name: string, value: string, onChange: ChangeEventHandler, label?: string, className?: string; }) {
	return <Input
		label={label ?? ""}
		id='icon'
		type="select"
		name={name}
		className={className}
		value={value}
		onChange={onChange}
		options={icons.map((url) => ([url.split(".")[0], <><div>{url}</div><img src={url} className="w-6 h-6" /></>] as const))}
	/>;
}
