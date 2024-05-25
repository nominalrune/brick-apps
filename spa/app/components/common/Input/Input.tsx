import { useId, useRef, useState } from 'react';
import Select from 'react-select';
import { twMerge } from 'tailwind-merge';
type LabelProps = {
	label: string;
	prefix?: string;
	suffix?: string;
};
type InputType = "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
type InputProps = {
	type: InputType;
	id: string;
	value: any;
	disabled?: boolean;
	options?: [label: string, value?: any][];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
} & Omit<JSX.IntrinsicElements['input'], "value" | "onChange">;

type SelectProps = {
	type: "select";
	id: string;
	value: any;
	disabled?: boolean;
	options: [label: string, value?: any][];
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
} & Omit<JSX.IntrinsicElements['select'], "value" | "onChange">;
type TextareaProps = {
	type: "textarea";
	id: string;
	value: any;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
} & Omit<JSX.IntrinsicElements['textarea'], "value" | "onChange">;

export default function Input(props: LabelProps & (InputProps | SelectProps | TextareaProps)) {
	const _id = useId();
	return <div className="text-nowrap">
		<label htmlFor={_id}>{props.label}</label>
		<div className="flex gap-1 items-end">
			<label htmlFor={_id}>{props.prefix}</label>
			<BaseInput
				{...props}
				className={twMerge("rounded-sm border-slate-300", props.type === "textarea" ? "min-w-36 w-[calc(100%_-_5rem)]" : "max-w-36", ["checkbox", "radio"].includes(props.type) ? "text-sky-500" : "", props.className)}
				name={props.id}
				id={_id}
			/>
			<label htmlFor={_id}>{props.suffix}</label>
		</div>
	</div>;
}

function BaseInput(props: (InputProps | SelectProps | TextareaProps)) {
	const listId = useId();
	switch (props.type) {
		case "select":
			return <_Select props={props} />;
		case "textarea":
			return <Textarea props={props} />;
		default:
			return <>
				<input
					title={props.value}
					list={listId}
					{...props}
				/>
				{props.options && <datalist id={listId}>{
					props.options.map(([label, value]) => <option key={label} value={value ?? label}>{label}</option>)
				}</datalist>}
			</>;
	}
}
function Textarea({ props }: { props: Omit<TextareaProps, "type" | "options">; }) {
	const ref = useRef(null);
	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const target = e.target;
		target.style.height = "auto";
		target.style.height = `calc(${target.scrollHeight}px + 0.5rem)`;
		props.onChange(e);
	}
	return <>
		<textarea
			ref={ref}
			className={props.className}
			value={props.value}
			onChange={handleChange}
			disabled={props.disabled}
			name={props.name}
			id={props.id}
			title={props.value}
			style={{ height: "4.5rem" }}
		/>
	</>;
}

function _Select({ props }: { props: Omit<SelectProps, "type">; }) {
	return <Select
		className={props.className}
		value={props.value}
		onChange={props.onChange}
		isDisabled={props.disabled}
		name={props.name}
		id={props.id}
		// title={props.value}
		options={props.options?.map(([label, value]) => ({ label, value: value ?? label }))}
	/>;
}