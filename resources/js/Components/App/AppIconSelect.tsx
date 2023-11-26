import { ChangeEventHandler, ReactNode } from 'react';
import Input from '../Input';
import { default as icons } from './app_icons.json';

export default function AppIconSelect({ value, name, label, onChange, className }: { name: string, value: string, onChange: ChangeEventHandler, label?: string, className?: string; }) {
    return <Input
        label={label}
        type="select"
        name={name}
        className={className}
        value={value}
        onChange={onChange}
        options={Object.entries(icons).map(([key, url]) => ([key, <><div>{url}</div><img src={url} className="w-6 h-6" /></>] as const))}
    />;
}
