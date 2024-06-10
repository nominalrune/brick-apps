import { Draggable, Droppable } from '~/components/common/Dnd';
import { FiMoreVertical } from '@react-icons/all-files/fi/FiMoreVertical';
import Input from '../../../common/Input';
import { InputTypeOption } from '~/model/App/View/InputTypes';
import { useEffect, useState } from 'react';
import Column from '~/model/App/Column';
import Columns from '~/model/App/Columns';
export default Palette;

function Palette({ items, name }: { items: Columns, name: string, }) {
	return <Droppable droppableId={name} >
		{provided => (
			<div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col'>
				{
					items.filter((i):i is Column=>!!i).map((item, i) => (
						<Draggable draggableId={item.code} index={i} key={item.code + "-" + (i - items.length).toString()}>{
							provided => (
								<div className="relative m-1 p-1 py-2 border border-sky-400 border-dashed rounded bg-slate-50 cursor-grab inline-flex items-center"
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<div className="absolute inset-0 w-full h-full"></div>
									<FiMoreVertical className="p-1 text-2xl text-slate-500" />
									<Input
										id={item.code + "-" + (i).toString()}
										type={"text"}
										name={item.code + "-" + (i).toString()}
										value={""}
										placeholder={item.code}
										disabled
										className="max-w-[9rem]"
										onChange={() => { }}
									/>
								</div>
							)}</Draggable>
					))
				}
				{provided.placeholder}
			</div>
		)}
	</Droppable>;
}

