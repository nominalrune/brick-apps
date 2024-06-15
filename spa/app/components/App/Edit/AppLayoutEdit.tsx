import Palette from '~/components/App/Edit/Form/Palette';
import AppForm from '~/components/App/Edit/Form/Form';
import useApp from '~/hooks/App/useApp';
import { DragDropContext } from '~/components/common/Dnd';
import AppDetailsLayout from '~/model/App/AppDetailsLayout';
import { ReactNode } from 'react';
import Columns from '~/model/App/Columns';
import Position from '~/model/Position';
import Widget from '~/model/App/View/Widget';
import { DropResult } from 'react-beautiful-dnd';
import App from '~/model/App/App';
import NewApp from '~/model/App/NewApp';
interface Props {
	app: App | NewApp,
	columnsEditForm: ReactNode,
	updateWidget: (position: Position, widget: Widget) => void,
	removeWidget: (position: Position) => void,
	onDragEnd: (e: DropResult) => void,
}
export default function AppLayoutEdit(props: Props) {
	const inputItems = ["text", "textarea", "number", "select", "radio", "checkbox", "datetime-local", "year", "month", "date", "time", "reference", "file"]
	return <DragDropContext onDragEnd={props.onDragEnd}>
		<div className="flex h-screen">
			<div className='border-r border-slate-400 bg-sky-50'>
				{props.columnsEditForm}
				<Palette items={inputItems} name="palette" />
			</div>

			<div className='col-span-3 flex flex-col'>
				<AppForm
					table={props.viewContent.content}
					update={props.updateWidget}
					remove={props.removeWidget}
				/>
			</div>
		</div>
	</DragDropContext>;
}