import Cards from './ListLayouts/Cards';
import Calendar from './ListLayouts/Calendar';
import Table from './ListLayouts/Table';

/**
 * defines List view.
 * types can be "table", "cards", "calendar", "timeline", "kanban", "gantt", "chart", "map"
 */
export default abstract class ListLayout<T> {
	public listType:string;
	public content: T;
	constructor(list: { listType: string, content: T; }) {
		this.listType = list.listType;
		this.content = list.content;
		// if (Table.isTable(list)) {
		// 	this.content = new Table(list.content);
		// } else if (Cards.isCards(list)) {
		// 	this.content = new Cards(list.content);
		// } else if (Calendar.isCalendar(list)) {
		// 	this.content = new Calendar(list.content);
		// } else {
		// 	throw new Error("Invalid argument. Given argument is not an array.");
		// }
	}
	abstract toJSON():object
};