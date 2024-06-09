import { Draggable } from '~/components/common/Dnd';
import { BiCog } from '@react-icons/all-files/bi/BiCog';
import { BiX } from '@react-icons/all-files/bi/BiX';
import { useState, type ReactNode, type FormEvent, useEffect } from 'react';
import Widget from '~/model/App/View/Widget';
import Input from '~/components/common/Input/Input';

export default function WidgetBox({ item, index, onConfig, remove }: { item: Widget, index: number, onConfig: () => void, remove: () => void; }) {
	const inputType = "reference" === item.type ? "number" : item.type;//["reference"].includes(item.type)?"number":item.type;
	return <Draggable draggableId={item.code} index={index}>{
		provided => (
			<div className='border border-sky-400 border-dashed h-24 p-1 m-1 flex'
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
			>
				<div className='bg-slate-200 rounded p-1 m-1 cursor-grab'></div>
				<Input
					label={item.label || "(no name)"}
					disabled
					type={inputType}
					name={item.code}
					value={item.defaultValue}
					prefix={item.prefix}
					suffix={item.suffix}
					className="opacity-90 text-slate-700"
				/>
				{/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
				<div className='text-red-500'>{item.error}</div>
				<div className='m-1 p-1 grid'>
					<BiCog className="transition-colors duration-500 text-2xl text-slate-600 hover:text-slate-900 cursor-pointer" onClick={() => onConfig()} />
					<BiX className="transition-colors duration-500 text-2xl text-slate-600 hover:text-slate-900 cursor-pointer" onClick={remove} />
				</div>
			</div>

		)}</Draggable>;
}
