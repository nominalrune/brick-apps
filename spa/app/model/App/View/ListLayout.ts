import Widget from '~/model/App/View/Widget';
import Position from '~/model/Position';
import Cards from './ListLayouts/Cards';
import Calendar from './ListLayouts/Calendar';
import Table from './ListLayouts/Table';
import WithoutMethods from '~/model/common/WithoutMethods';


/**
 * defines List view.
 * types can be "table", "cards", "calendar", "timeline", "kanban", "gantt", "chart", "map"
 */
export default class ListLayout {
	public get listType() {
		return this.content.listType;
	};
	public content: Table | Cards | Calendar;
	constructor(list: { listType: string, content: unknown } ) {
		if (Table.isTable(list)) {
			this.content = new Table(list.content);
		} else if (Cards.isCards(list)) {
			this.content = new Cards(list.content);
		} else if (Calendar.isCalendar(list)) {
			this.content = new Calendar(list.content);
		} else {
			throw new Error("Invalid argument. Given argument is not an array.");
		}
	}
	toJSON() {
		return this.content.toJSON();
	}
};