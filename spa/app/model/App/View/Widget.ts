// import { ViewItemData } from '~/model/App/View/ViewItemData';
import { ReactNode } from 'react';
import ViewItemData from './ViewItemData';
import { InputTypeOption, } from './InputTypes';
import WithoutMethods from '~/model/common/WithoutMethods';
import Column from '../Column';
import Columns from '../Columns';
export default class Widget<U extends any = any> implements ViewItemData<U> {
	private _error = "";
	get error() { return this._error; }
	public defaultValue: U | undefined;
	public readonly referringAppCode?: string;
	public readonly type: InputTypeOption;
	get code() {
		return this.column.code;
	}
	public readonly column: Column;
	public readonly label: string;
	public readonly prefix: string;
	public readonly suffix: string;
	public readonly rules: {
		required?: boolean,
		min?: number,
		max?: number,
		pattern?: string,
		customValidator?: (value: string) => { validity: boolean, errorMessage: string; };
		options?: ([value: any] | [value: any, label: ReactNode])[];
	} | undefined;
	constructor(data: Omit<Widget<U>, "toJSON" | "with" | "withValue" | "clone" | "error" | "_error">) {
		this.type = data.type;
		this.column = data.column;
		this.label = data.label;
		this.prefix = data.prefix;
		this.suffix = data.suffix;
		this.rules = data.rules;

		this.defaultValue = data.defaultValue;
		if (this.type === "reference") {
			this.referringAppCode = data.referringAppCode;
		}
	}
	withValue(value: U) {
		return new Widget({ ...this, defaultValue: value });
	}
	with(key: keyof Widget, value: unknown) {
		return new Widget({ ...this, [key]: value });
	}
	clone() {
		return new Widget(this);
	}
	toJSON(): ViewItemData<U> {
		return {
			type: this.type,
			code: this.code,
			defaultValue: this.defaultValue,
			label: this.label,
			prefix: this.prefix,
			suffix: this.suffix,
			rules: this.rules,
			referringAppCode: this.referringAppCode,
		};
	}
	static fromData(data: ViewItemData, columns: Columns) {
		const column = columns.filter((i): i is Column=>!!i).find((column) => column.code === data.code);
		if (!column) { throw new Error(`Column not found error. There is no column with code "${data.code}".`); }
		const { prefix = "", suffix = "", rules } = data;
		return new Widget({ ...data, prefix, suffix, rules, column });
	}
	// toJSON() {
	//     return JSON.stringify(this.toDTO());
	// }
}
