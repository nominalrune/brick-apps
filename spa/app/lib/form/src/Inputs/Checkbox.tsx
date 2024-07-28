type Props = {
    id: string;
    name: string;
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Checkbox({ id, name, value, onChange }: Props) {
    return (
        <input
            id={id}
            type="checkbox"
            name={name}
            checked={value}
            className="size-4 m-1 self-center rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            onChange={onChange}
            autoFocus={false}
        />
    );
}