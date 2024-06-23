import Palette from '~/components/App/Edit/Form/Palette';
import AppForm from '~/components/App/Edit/Form/Form';
import useApp from '~/hooks/App/useApp';
import { DragDropContext } from '~/components/common/Dnd';
import DetailLayout from '~/model/App/View/DetailLayout';
import { ReactNode } from 'react';
import Columns from '~/model/App/Columns';
import Position from '~/model/Position';
import Widget from '~/model/App/View/Widget';
import { DropResult } from 'react-beautiful-dnd';
import App from '~/model/App/App';
import NewApp from '~/model/App/NewApp';
interface Props {
	app: App | NewApp,
	updateWidget: (position: Position, widget: Widget) => void,
	removeWidget: (position: Position) => void,
	onDragEnd: (e: DropResult) => void,
}
export default function AppLayoutEdit(props: Props) {
	const inputItems = ["text", "textarea", "number", "select", "radio", "checkbox", "datetime-local", "month", "date", "time", "reference", "file"] as const;
	return <DragDropContext onDragEnd={props.onDragEnd}>
		<div className="flex h-screen">
			<div className='border-r border-slate-400 bg-sky-50'>
				<details open>
					<summary className='m-1 border rounded w-60 bg-sky-300'>general brick</summary>
					<Palette items={inputItems} name="palette" />
				</details>
			</div>

			<div className='col-span-3 flex flex-col'>
				<AppForm
					table={props.app.layout.content}
					update={props.updateWidget}
					remove={props.removeWidget}
				/>
			</div>
		</div>
	</DragDropContext>;
}