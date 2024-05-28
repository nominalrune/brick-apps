import Palette from '~/components/App/Edit/Form/Palette';
import AppForm from '~/components/App/Edit/Form/Form';
import useDnDAppEditor from '~/hooks/useDnDAppEditor';
import { inputItems } from '~/model/App/View/InputTypes';
import { DragDropContext } from '~/components/common/Dnd';
export default function AppLayout(prop:ReturnType<typeof useDnDAppEditor>) {
	return <DragDropContext onDragEnd={prop.onDragEnd}>
		<div className="grid grid-cols-4 h-screen">
			<div className='col-span-1 bg-white'>
				<Palette items={prop.fields} name="palette" />
			</div>
			<div className='col-span-3 flex flex-col'>
				<AppForm table={prop.table.form} update={prop.updateTable} remove={prop.removeTableItem} />
			</div>
		</div>
	</DragDropContext>;
}