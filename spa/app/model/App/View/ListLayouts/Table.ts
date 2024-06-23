import Widget from '../Widget';

export default class Table {
	public readonly listType = "table";
	public readonly content: Widget[];
	constructor(content: Widget[]) {
		if (!Array.isArray(content)) throw new Error("Invalid argument. Given argument is not an array.");
		this.content = content;
	}
	toJSON() {
		return {
			listType: "table",
			conetnt: this.content.map(item => item.toJSON())
		};
	}
	static isTable(item: unknown): item is Table {
		return (
			typeof item === "object"
			&& item !== null
			&& "listType" in item
			&& item["listType"] === "table"
		);
	}
}