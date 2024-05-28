import Position from '~/model/Position';
import ViewItem from '~/model/App/View/ViewItem';
import { Draggable, Droppable } from '~/components/common/Dnd';
import Input from '../../../common/Input/Input';
import { useState, type ReactNode, type FormEvent, useEffect } from 'react';
import WidgetBox from './Widget/WidgetBox';

type Select = ({ position, input }: { position: Position, input: ViewItem; }) => void;

export default function AppFormRow({ row, rowIndex, select, remove }: { row: ViewItem[], rowIndex: number, select: Select, remove: ([x, y]: Position) => void; }) {
	return <Droppable droppableId={rowIndex.toString()} direction='horizontal'>
		{provided => (
			<div className='p-1 border-b-2 border-slate-200 h-28 last:flex-grow flex' ref={provided.innerRef} {...provided.droppableProps}>
				{row.map((item, col) => <WidgetBox
					index={col}
					id={item.code}
					key={item.code}
					onConfig={() => { select({ position: [rowIndex, col], input: item }); }}
					remove={() => remove([rowIndex, col])}>
					<Input label={item.label || "(no name)"} disabled type={item.type} name={item.code} value={item.defaultValue} className="opacity-90 text-slate-700" />
					<div className='text-red-500'>{item.error}</div>
				</WidgetBox>)}
				{provided.placeholder}
			</div>
		)}
	</Droppable>;
}