import { Draggable } from '~/components/common/Dnd';
import { BiCog } from '@react-icons/all-files/bi/BiCog';
import { BiX } from '@react-icons/all-files/bi/BiX';
import { useState, type ReactNode, type FormEvent, useEffect } from 'react';

export default function WidgetBox({ index, id, children, onConfig, remove }: { index: number, id: string, children: ReactNode, onConfig: () => void, remove: () => void; }) {
	return <Draggable draggableId={id} index={index}>{
		provided => (
			<div className='border border-sky-400 border-dashed h-24 p-1 m-1 flex'
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
			>
				<div className='bg-slate-200 rounded p-1 m-1 cursor-grab'></div>
				{children}
				<div className='m-1 p-1 grid'>
					<BiCog className="transition-colors duration-500 text-2xl text-slate-600 hover:text-slate-900 cursor-pointer" onClick={() => onConfig()} />
					<BiX className="transition-colors duration-500 text-2xl text-slate-600 hover:text-slate-900 cursor-pointer" onClick={remove} />
				</div>
			</div>

		)}</Draggable>;
}
