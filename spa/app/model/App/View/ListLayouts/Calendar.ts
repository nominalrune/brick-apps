import ListLayout from '../ListLayout';

/**
 *
 */
export default class Calendar extends ListLayout<{
	title: string,
	start: string,
	end: string,
}> {
	toJSON() {
		return {
			listType: this.listType,
			content: this.content,
		};
	}
	static isCalendar(item: unknown): item is Calendar {
		return (
			item instanceof Object
			&& "listType" in item
			&& item["listType"] === "calendar"
		);
	}
}
