import Widget from '~/model/App/View/Widget';
import Position from '~/model/Position';

export default class AppDetailsLayout {
	public readonly content: Widget[][];
	constructor(_content: Widget[][]) {
		if(!Array.isArray(_content)) throw new Error("Invalid argument. Given argument is not an array.");
		this.content = _content.filter(row => row.length !== 0);
	}
	map<T>(callbackfn: (inputs: Widget[], i?: number, arr?: Widget[][]) => T) {
		return this.content.map(callbackfn);
	}
	at(row: number) {
		return this.content[row] ?? [];
	}
	get([row, col]: Position) {
		return this.content[row]?.[col];
	}
	insert([x, y]: Position, inputData: Widget) {
		if (!this.content[x]) {
			this.content[x] = [];
		}
		const newInputs = this.at(x).toSpliced(y, 0, inputData);
		return new AppDetailsLayout(this
			.map((row, i) => i === x ? newInputs : row)
			.filter((row) => (row && row.length !== 0)));
	}
	update([x, y]: Position, value: Widget) {
		const updatedRow = this.at(x).toSpliced(y, 1, value);
		const newInstance = new AppDetailsLayout(this
			.map((row, i) => i === x ? updatedRow : row)
			.filter((row) => (row && row.length !== 0))
		);
		return newInstance;
	}
	move([fromRow, fromCol]: Position, [toRow, toCol]: Position) {
		// console.log("before move", JSON.stringify(this.content));
		const item = this.get([fromRow, fromCol]);
		if (!item) { return this; }

		if (fromRow === toRow) {
			const clone = Array.from(this.at(fromRow));
			const [removed] = clone.splice(fromCol, 1);
			clone.splice(toCol, 0, removed);
			const result = new AppDetailsLayout(this.content
				.map((row, i) => i === fromRow ? clone : row)
				.filter((row) => (row && row.length !== 0))
			);
			// console.log("after move", JSON.stringify(result.content));
			return result;
		}
		while (this.content.length <= toRow) {
			this.content.push([]);
		}
		const result = new AppDetailsLayout(this.content
			.map((row, i) => i === fromRow ? row.toSpliced(fromCol, 1) : i === toRow ? row.toSpliced(toCol, 0, item) : row)
			.filter((row) => (row && row.length !== 0))
		);
		// console.log("after move", JSON.stringify(result.content));
		return result;
	}
	remove([x, y]: Position) {
		return new AppDetailsLayout(this.content
			.map((row, i) => i === x ? row.toSpliced(y, 1) : row)
			.filter((row) => (row && row.length !== 0))
		);
	}
	toJSON() {
		return this.content.map(row => row.map(col => col.toJSON()));
	}
	// static parse(json: string) {
	// 	if (json.length < 2) {
	// 		throw new Error(`Invalid argument. Given argument is not a valid json : ${json}`);
	// 	}
	// 	let parsed;
	// 	try {
	// 		parsed = JSON.parse(json);
	// 	} catch (e) {
	// 		throw new Error(`Invalid argument. Given argument is not a valid json : ${json}`);
	// 	}
	// 	if (ViewContent.isValid(parsed)) {
	// 		return new ViewContent(parsed.map(row => row.map(item => ViewItem.fromData(item))));
	// 	}
	// 	throw new Error(`Invalid argument. Given argument json is malformed : ${json}`);
	// }
	// /**
	//  * TODO
	//  */
	// static isValid(json: unknown): json is ViewItemData[][] {
	// 	if (Array.isArray(json) && json.every(row => Array.isArray(row) && row.every(item => ('code' in item && "type" in item && "defaultValue" in item)))) {
	// 		return true;
	// 	}
	// 	return false;
	// }
}
