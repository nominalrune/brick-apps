import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FiMoreVertical } from '@react-icons/all-files/fi/FiMoreVertical';
import Input from '../common/Input';
import { InputTypeOption } from '~/model/App/View/InputTypes';
export default Palette;

function Palette({ items, name }: { items: readonly InputTypeOption[],name:string, }) {
    return <Droppable droppableId={name} >
        {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
                {
                    items.map((item, i) => (
                        <Draggable draggableId={item} index={i} key={item + "-" + (i - items.length).toString()}>{
                            provided => (
                                <div className="m-1 p-1 py-2 border-[1px] border-slate-100 rounded bg-slate-50 cursor-grab flex flex-shrink items-center"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <FiMoreVertical className="p-1 text-2xl text-slate-500" />
                                    <Input
                                        type={item}
                                        name={item + "-" + (i).toString()}
                                        value={""}
                                        placeholder={item}
                                        disabled
                                        className="max-w-[9rem]"
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

