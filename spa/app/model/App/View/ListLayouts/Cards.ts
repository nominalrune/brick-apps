import Widget from '~/model/App/View/Widget';
import ListLayout from '../ListLayout';

/**
 * defines List view.
 * types can be "table", "cards", "calendar", "timeline", "kanban", "gantt", "chart", "map"
 */
export default class Cards extends ListLayout<Widget[][]> {

	constructor({ listType, content }: { listType: "cards", content: Widget[][]; }) {
		super({ listType, content });
	}
	toJSON() {
		return {
			listType: this.listType,
			content: this.content,
		};
	}
	static isCards(item: unknown): item is Cards {
		return (
			item instanceof Object
			&& "listType" in item
			&& item["listType"] === "cards"
		);
	}
}
