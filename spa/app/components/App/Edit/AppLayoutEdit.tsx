import Palette from '~/components/App/Edit/Form/Palette';
import AppForm from '~/components/App/Edit/Form/Form';
import useAppEditor from '~/hooks/App/useAppEditor';
import { DragDropContext } from '~/components/common/Dnd';
import ViewContent from '~/model/App/View/ViewContent';
import { ReactNode } from 'react';
import Fields from '~/model/App/FIelds';
interface Props{
	fields:Fields,
	FieldsEdit:()=>ReactNode,
	table:ViewContent,
	onDragEnd:()=>void,

}
export default function AppLayoutEdit({FieldsEdit, ...props }: Props) {
	return <DragDropContext onDragEnd={props.onDragEnd}>
		<div className="flex h-screen">
			<div className='border-r border-slate-400 bg-sky-50'>
				<FieldsEdit/>
				<Palette items={props.fields} name="palette" />
			</div>

			<div className='col-span-3 flex flex-col'>
				<AppForm
					table={props.table.content}
					update={props.update}
				/>
			</div>
		</div>
	</DragDropContext>;
}