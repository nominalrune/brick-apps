import Position from '~/model/Position';
import AppInput from '~/model/App/AppInput';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Input from '../Input';
import { BiCog } from '@react-icons/all-files/bi/BiCog';
import { BiX } from '@react-icons/all-files/bi/BiX';
import { useState, type ReactNode, type FormEvent } from 'react';
import InputSettingModal from './InputSettingModal';

type Select = ({ position, input }: { position: Position, input: AppInput; }) => void;
interface Param {
    table: AppInput[][],
    update: ([x, y]: Position, value: AppInput) => void,
    remove: ([x, y]: Position) => void,
}

export default function AppForm({ table, update, remove }: Param) {
    const [selectedInput, setSelectedInput] = useState<{ addr: Position, input: AppInput; } | undefined>(undefined);

    function handleConfigChange(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedInput) { return; }
        const form = e.currentTarget;
        if (!(form instanceof HTMLFormElement)) { return; }
        const { code, label,type, valueType, defaultValue, prefix, suffix } = Object.fromEntries((new FormData(form)).entries());
        const newInput = selectedInput.input
            .update("type", type)
            .update("valueType",valueType)
            .update("code", code)
            .update("label", label)
            .update("defaultValue", defaultValue)
            .update("prefix", prefix)
            .update("suffix", suffix);
        console.log({ newInput })
        update(selectedInput.addr, newInput);
        setSelectedInput(undefined);
    }
    const extraRow = <AppFormRow
        key={table.length + 1}
        row={[]}
        rowIndex={table.length + 1}
        select={(param) => setSelectedInput(param)}
        remove={remove}
    />;
    const rows = table.map((row, i) => <AppFormRow
        key={i}
        row={row}
        rowIndex={i}
        select={(param) => setSelectedInput(param)}
        remove={remove}
    />).concat(extraRow);
    return <>
        <InputSettingModal
            inputData={selectedInput?.input}
            onClose={() => setSelectedInput(undefined)}
            onSubmit={handleConfigChange}
        />
        {rows}
    </>;
}
function AppFormRow({ row, rowIndex, select, remove }: { row: AppInput[], rowIndex: number, select: Select, remove: ([x, y]: Position) => void; }) {
    return <Droppable droppableId={rowIndex.toString()} direction='horizontal'>
        {provided => (
            <div className='p-1 border-b-2 border-slate-200 h-28 last:flex-grow flex' ref={provided.innerRef} {...provided.droppableProps}>
                {row.map((item, col) => <AppFormItem
                    index={col}
                    id={item.code}
                    key={item.code}
                    onConfig={() => { select({ position: [rowIndex, col], input: item }); }}
                    remove={() => remove([rowIndex, col])}>
                    <Input label={item.label || "(no name)"} disabled type={item.type} name={item.code} value={item.defaultValue} className="opacity-90 text-slate-700" />
                    <div className='text-red-500'>{item.error}</div>
                </AppFormItem>)}
                {provided.placeholder}
            </div>
        )}
    </Droppable>;
}
function AppFormItem({ index, id, children, onConfig, remove }: { index: number, id: string, children: ReactNode, onConfig: () => void, remove: () => void; }) {
    return <Draggable draggableId={id} index={index}>{
        provided => (
            <div className='border-[1px] border-sky-400 border-dashed h-24 p-1 m-1 flex'
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
