import { Draggable, Droppable } from '~/components/common/Dnd';
import { FiMoreVertical } from '@react-icons/all-files/fi/FiMoreVertical';
import Input from '../../../common/Input';
import { InputTypeOption } from '~/model/App/View/InputTypes';
import { useEffect, useState } from 'react';
import Field from '~/model/App/Field';
export default Palette;

function Palette({ items, name }: { items: readonly Field[], name: string, }) {
	return <Droppable droppableId={name} >
		{provided => (
			<div ref={provided.innerRef} {...provided.droppableProps}>
				{
					items.map((item, i) => (
						<Draggable draggableId={item.code + "-" + (i - items.length)} index={i} key={item.code + "-" + (i - items.length).toString()}>{
							provided => (
								<div className="m-1 p-1 py-2 border-[1px] border-slate-100 rounded bg-slate-50 cursor-grab flex flex-shrink items-center"
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
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
									<details>

									{JSON.stringify(provided)}
									</details>
								</div>
							)}</Draggable>
					))
				}
				{provided.placeholder}
			</div>
		)}
	</Droppable>;
}

