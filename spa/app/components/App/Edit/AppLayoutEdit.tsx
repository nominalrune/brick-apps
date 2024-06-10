import Palette from '~/components/App/Edit/Form/Palette';
import AppForm from '~/components/App/Edit/Form/Form';
import useAppEditor from '~/hooks/App/useAppEditor';
import { DragDropContext } from '~/components/common/Dnd';
import ViewContent from '~/model/App/View/ViewContent';
import { ReactNode } from 'react';
import Columns from '~/model/App/Columns';
import Position from '~/model/Position';
import Widget from '~/model/App/View/Widget';
import { DropResult } from 'react-beautiful-dnd';
interface Props {
	columns: Columns,
	columnsEditForm: ReactNode,
	table: ViewContent,
	updateWidget: (position:Position, widget:Widget) => void,
	removeWidget: (position:Position) => void,
	onDragEnd: (e:DropResult) => void,
}
export default function AppLayoutEdit({ columnsEditForm, ...props }: Props) {
	return <DragDropContext onDragEnd={props.onDragEnd}>
		<div className="flex h-screen">
			<div className='border-r border-slate-400 bg-sky-50'>
				{columnsEditForm}
				<Palette items={props.columns} name="palette" />
			</div>

			<div className='col-span-3 flex flex-col'>
				<AppForm
					table={props.table.content}
					update={props.updateWidget}
					remove={props.removeWidget}
				/>
			</div>
		</div>
	</DragDropContext>;
}