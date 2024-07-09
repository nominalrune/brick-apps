import Widget from '~/model/App/View/Widget';

/**
 * defines List view.
 * types can be "table", "cards", "calendar", "timeline", "kanban", "gantt", "chart", "map"
 */
export default class Cards {
	public readonly listType="cards";
	public readonly content: Widget[][];
	constructor(content: Widget[][]) {
		if(!Array.isArray(content)) throw new Error("Invalid argument. Given argument is not an array.");
		this.content = content.filter(row => row.length !== 0);
	}
	toJSON() {
		return {
			listType: this.listType,
			content:this.content.map(row => row.map(col => col.toJSON()))
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
