import InputType from './InputType';

type AttributeBase<T extends InputType = InputType, Name extends string = string> = {
    type: T,
    name: Name,
    label?: React.ReactNode,
    prefix?: React.ReactNode,
    suffix?: React.ReactNode,
    defaultValue?: T extends 'checkbox' ? boolean : T extends "number" ? number : T extends "group" | "iterable-group" ? object : string,
    customValidator?: (value: string) => { validity: boolean, errorMessage: string; };
    options?: readonly (readonly [label: string, value: string | number])[],
    onChange?: (data: any, setData: React.Dispatch<React.SetStateAction<any>>) => any;
};
export default AttributeBase;