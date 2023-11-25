import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FiMoreVertical } from 'react-icons/fi';
import TextInput from '../TextInput';
export default Palette;

function Palette({ items }: { items: readonly string[]; }) {
    return <Droppable droppableId="palette" >
        {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
                {
                    items.map((item, i) => (
                        <Draggable draggableId={item + "-" + (i - items.length).toString()} index={i} key={item + "-" + (i - items.length).toString()}>{
                            provided => (
                                <div className="m-1 p-1 py-2 border-[1px] border-slate-100 rounded bg-slate-50 cursor-grab flex flex-shrink items-center"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <FiMoreVertical className="p-1 text-2xl text-slate-500" />
                                    <TextInput
                                        type={item}
                                        name={item + "-" + (i - items.length).toString()}
                                        value={item === "color" ? "#000000" : ""}
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

