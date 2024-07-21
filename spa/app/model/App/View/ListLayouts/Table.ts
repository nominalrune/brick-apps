import ListLayout from '../ListLayout';
import Widget from '../Widget';

export default class Table extends ListLayout<Widget[]>{

	toJSON() {
		return {
			listType: "table",
			conetnt: this.content.map(item => item.toJSON())
		};
	}
	static isTable(item: unknown): item is Table {
		return (
			item instanceof Object
			&& "listType" in item
			&& item["listType"] === "table"
		);
	}
}