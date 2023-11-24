import Address from '@/Models/Address';
import AppInput from '@/Models/App/InputData';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TextInput from '../TextInput';
import { BiCog, BiX } from 'react-icons/bi';
import { useState, type ReactNode, type FormEvent } from 'react';
import InputSettingModal from './InputSettingModal';

type Select = ({ addr, input }: { addr: Address, input: AppInput; }) => void;
export default function AppForm({ table, update, remove }: { table: AppInput[][], update: ([x, y]: Address, value: AppInput<string>) => void, remove: ([x, y]: Address) => void; }) {
    const [selectedInput, setSelectedInput] = useState<{ addr: Address, input: AppInput; } | undefined>(undefined);

    function handleConfigChange(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedInput) { return; }
        const form = e.currentTarget;
        if (!(form instanceof HTMLFormElement)) { return; }
        const { code, label, defaultValue, prefix, suffix } = Object.fromEntries((new FormData(form)).entries());
        const newInput = selectedInput.input
            .update("code", code)
            .update("label", label)
            .update("defaultValue", defaultValue)
            .update("prefix", prefix)
            .update("suffix", suffix);

        update(selectedInput.addr, newInput);
        setSelectedInput(undefined);
    }
    const rows = Array.from({ length: table.length }, (_, i) => <AppFormRow
        row={table[i]}
        rowIndex={i}
        key={i}
        select={(param) => setSelectedInput(param)}
        remove={remove}
    />
    );
    return <>
        <InputSettingModal
            inputData={selectedInput?.input}
            onClose={() => setSelectedInput(undefined)}
            onSubmit={handleConfigChange}
        />
        {rows}
    </>;
}
function AppFormRow({ row, rowIndex, select, remove }: { row: AppInput[], rowIndex: number, select: Select, remove: ([x, y]: Address) => void; }) {
    return <Droppable droppableId={rowIndex.toString()} direction='horizontal'>
        {provided => (
            <div className='p-1 border-b-2 border-slate-200 h-28 last:flex-grow flex' ref={provided.innerRef} {...provided.droppableProps}>
                {row.map((item, col) => <AppFormItem
                    index={col}
                    id={item.code}
                    key={item.code}
                    onConfig={() => { select({ addr: [rowIndex, col], input: item }); }}
                    remove={() => remove([rowIndex, col])}>
                    <TextInput label={item.label || "(no name)"} disabled type={item.type} name={item.code} value={item.defaultValue} className="opacity-90 text-slate-700" />
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
