import { Draggable, Droppable } from '~/components/common/Dnd';
import { FiMoreVertical } from '@react-icons/all-files/fi/FiMoreVertical';
import Input from '../../../common/Input';
import { InputTypeOption } from '~/model/App/View/InputTypes';
import { useEffect, useState } from 'react';
import Column from '~/model/App/Column';
import Columns from '~/model/App/Columns';
export default function Palette({ items, name }: { items: readonly InputTypeOption[], name: string, }) {
	return <Droppable droppableId={name} >
		{provided => (
			<div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col'>
				{
					items.map((item, i) => (
						<Draggable draggableId={item} index={i} key={item + "-" + (i - items.length).toString()}>{
							provided => (
								<div className="relative m-1 p-1 py-2 border border-sky-400 border-dashed rounded bg-slate-50 cursor-grab inline-flex items-center"
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<div className="absolute inset-0 w-full h-full"></div>
									<FiMoreVertical className="p-1 text-2xl text-slate-500" />

									{/* @ts-expect-error typeがおかしいってさ */}
									<Input
										id={item + "-" + (i).toString()}
										name={item + "-" + (i).toString()}
										type={item === "reference" ? "text" : item}
										value={""}
										placeholder={item}
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

