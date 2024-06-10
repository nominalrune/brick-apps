import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { useState } from 'react';
import Button from '~/components/common/Button/Button';
import CircleButton from '~/components/common/Button/CircleButton';
import Input from '~/components/common/Input/Input';
import Modal from '~/components/common/Modal';
import Columns from '~/model/App/Columns';

export default function EditColumns({ columns, update }: { columns: Columns; update: (columns: Columns) => void; }) {
	const [show, setShow] = useState(false);
	return <div className='grid'>
		<Button onClick={() => setShow(!show)} className='m-1 rounded border-2 border-emerald-400 bg-slate-300 hover:bg-slate-400'>{show ? "閉じる" : "カラムの変更"}</Button>
		<Modal show={show} close={() => setShow(false)}>
			<div className='bg-white rounded p-3 flex flex-col'>
				<div className='contents'>
					{columns.map((column, i) => column ? <div className='flex border-b last:border-b-0 p-2 items-baseline' key={i}>
						<Input
							id={i + "code"}
							label={"code"}
							type='text'
							value={column.code}
							name={i + "code"}
							onChange={(e) => { update(columns.map((f, j) => (f && i === j) ? { ...f, code: e.target.value } : f)); }}
						/>
						<Input
							id={i + "valueType"}
							label={"valueType"}
							value={column.valueType}
							name={i + "valueType"}
							onChange={({ value, label }) => { update(columns.map((f, j) => (f && i === j) ? { ...f, valueType: value } : f)); }}
							type={"select"}
							options={[["varchar", "varchar"], ["int", "int"], ["text", "text"], ["date", "date"], ["datetime", "datetime"], ["time", "time"], ["boolean", "boolean"]]}
						/>
						<CircleButton onClick={() => { update(columns.map((f, j) => (f && i === j) ? null : f)); }}><FiX /></CircleButton>
					</div> : <></>)}
				</div>
				<Button onClick={() => { update([...columns, { code: "", valueType: "varchar" }]); }}><FiPlus/></Button>
				<div className="flex gap-2 justify-end">
					<Button onClick={() => { setShow(false); }} className='m-1 rounded primary'>閉じる</Button>
				</div>
			</div>
		</Modal>
	</div>;
}