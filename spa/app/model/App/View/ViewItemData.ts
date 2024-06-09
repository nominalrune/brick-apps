import { ReactNode } from 'react';
import { InputTypeOption, ReferringAppCode } from './InputTypes';
import JsValueType from '../JsValueType';
import ValueTypeOption from '../ValueTypeOption';
import Field from '../Field';

export default interface ViewItemData<U extends any = any> {
	code: string;
	type: InputTypeOption;
	label: string;
	prefix?: string;
	suffix?: string;
	defaultValue: U | undefined;
	referringAppCode?: ReferringAppCode;
	rules?: {
		required?: boolean,
		min?: number,
		max?: number,
		pattern?: string,
		customValidator?: (value: any) => any;
		options?: ([value: any] | [value: any, label: ReactNode])[];
	};
}
