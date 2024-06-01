import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable as _Droppable, DroppableProvided, Direction, DroppableStateSnapshot } from 'react-beautiful-dnd';

const Droppable = (prop: { droppableId: string, direction?: Direction, children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => ReactElement<HTMLElement, string | JSXElementConstructor<any>>; }) => {
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		const animation = requestAnimationFrame(() => setEnabled(true));
		return () => {
			cancelAnimationFrame(animation);
			setEnabled(false);
		};
	}, []);
	if (!enabled) {
		return null;
	}
	return <_Droppable droppableId={prop.droppableId} direction={prop.direction}>
		{prop.children}
	</_Droppable>;
};
export default Droppable;
export {Droppable, Draggable, DragDropContext };