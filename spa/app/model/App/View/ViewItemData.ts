import { ReactNode } from 'react';
import { InputTypeOption, ReferringAppCode } from './InputTypes';

export default interface ViewItemData {
	code: string;
	type: InputTypeOption;
	label: string;
	prefix?: string;
	suffix?: string;
	defaultValue: unknown;
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
