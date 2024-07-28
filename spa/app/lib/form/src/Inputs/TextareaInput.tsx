export default function TextareaInput({ name, value, className, onChange, underlineStyle, defaultValue, ...rest }: { name: string, value: string, defaultValue?: string, className?: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, underlineStyle?: boolean; }) {
	const classString = underlineStyle
		? "border-0 border-b-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 backdrop-blur "
		: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 rounded-md shadow-sm ";
	return <textarea
		name={name}
		value={value}
		className={classString + className}
		onChange={onChange}
		maxLength={2500}
		{...rest}
	/>;
}
