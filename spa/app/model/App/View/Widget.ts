// import { ViewItemData } from '~/model/App/View/ViewItemData';
import { ReactNode } from 'react';
import ViewItemData from './ViewItemData';
import { InputTypeOption, } from './InputTypes';
import WithoutMethods from '~/model/common/WithoutMethods';
import Field from '../Field';
import Fields from '../FIelds';
export default class Widget<U extends any = any> implements ViewItemData<U> {
	private _error = "";
	get error() { return this._error; }
	public defaultValue: U | undefined;
	public readonly referringAppCode?: string;
	public readonly type: InputTypeOption;
	get code() {
		return this.field.code;
	}
	public readonly field: Field;
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
		this.field = data.field;
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
	static fromData(data: ViewItemData, fields: Fields) {
		const field = fields.filter((i): i is Field=>!!i).find((field) => field.code === data.code);
		if (!field) { throw new Error(`Field not found error. There is no field with code "${data.code}".`); }
		const { prefix = "", suffix = "", rules } = data;
		return new Widget({ ...data, prefix, suffix, rules, field });
	}
	// toJSON() {
	//     return JSON.stringify(this.toDTO());
	// }
}
