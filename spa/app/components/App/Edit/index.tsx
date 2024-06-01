import Palette from '~/components/App/Edit/Form/Palette';
import AppForm from '~/components/App/Edit/Form/Form';
import useDnDAppEditor from '~/hooks/App/useDnDAppEditor';
import { inputItems } from '~/model/App/View/InputTypes';
import { DragDropContext } from '~/components/common/Dnd';
export default function AppLayout(prop: ReturnType<typeof useDnDAppEditor>) {
	return <DragDropContext onDragEnd={prop.onDragEnd}>
		<div className="flex h-screen">
			<div className='border-r border-slate-400 bg-sky-50'>
				<Palette items={prop.app.fields} name="palette" />
			</div>

			<div className='col-span-3 flex flex-col'>
				<AppForm
					table={prop.table.content}
					update={prop.updateTable}
					remove={prop.removeTableItem}
				/>
			</div>
		</div>
	</DragDropContext>;
}