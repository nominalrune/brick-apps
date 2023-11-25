import TextInput from '../TextInput';
import { default as icons } from './app_icons.json';

export default function AppIconSelect({ value, name, label, onChange, className }: { name: string, value: string, onChange: ChangeEventHandler, label?: string className?: string; }) {
    return <TextInput
        label={label}
        type="select"
        name={name}
        className={className}
        value={value}
        onChange={onChange}
        list={Object.entries(icons).map(([key, url]) => ([key, <img src={url} className="w-6 h-6" />]))}
    />;
}
