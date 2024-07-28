import Tuple from '@/types/Tuple';
import React, { ComponentProps } from 'react';
import InputType from './InputType';
import AttributeBase from './AttributeBase';



export type InputDataType<T extends AttributeBase<InputType, string>> =
    T['type'] extends 'number'
    ? number
    : T['type'] extends 'checkbox'
    ? boolean
    : T['type'] extends 'hidden'
    ? number | string
    : T['type'] extends 'select'
    ? number | string//@ts-expect-error
    : T['multiple'] extends true 
    ? number[] | string[]
    : T["type"] extends "iterable-group"
    ? { //@ts-expect-error
        [key in T['model'][number]['name']]//@ts-expect-error
        : InputDataType<T['model'][number]> }[]//@ts-expect-error
    : T['type'] extends 'group' ? { [key in T['model'][number]['name']]: InputDataType<T['model'][number]> }
    : string;
export type InputAttr<T extends InputType | "select" | "checkbox" | "textarea" | "group" | "iterable-group", Name extends string> = {
    type: T,
    name: Name,
    label?: React.ReactNode,
    prefix?: React.ReactNode,
    suffix?: React.ReactNode,
    defaultValue?: T extends 'checkbox' ? boolean : T extends "number" ? number : T extends "group" | "iterable-group" ? object : string,
    customValidator?: (value: string) => { validity: boolean, errorMessage: string; };
    options?: readonly (readonly [label: string, value: string | number])[],
} & Omit<ComponentProps<"input">, 'name'|'ref'|`aria-${string}`|"checked"|"value">;
export type FormModel<N extends number = number> = Tuple<AttributeBase, N>;//N extends 1 ? [AttributeBase] : N extends 2 ? [AttributeBase, AttributeBase] : N extends 3 ? [AttributeBase, AttributeBase, AttributeBase] : N extends 4 ? [AttributeBase, AttributeBase, AttributeBase, AttributeBase] : N extends 5 ? [AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase] : N extends 6 ? [AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase] : N extends 7 ? [AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase] : N extends 8 ? [AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase] : N extends 9 ? [AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase] : [AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase, AttributeBase];

export type TextareaAttr<Name extends string> = InputAttr<'textarea', Name>;
export interface TextareaParam<T extends DataObj<{ name: U, type: 'textarea'; }>, U extends keyof T & string> {
    field: TextareaAttr<U>,
    item: T,
    handleChange: (id: string | number, name: keyof T & string, value: string) => void;
}
export type CheckboxAttr<Name extends string> = InputAttr<'checkbox', Name>;
export interface CheckboxParam<T extends DataObj<{ name: U, type: 'checkbox'; }>, U extends keyof T & string> {
    field: CheckboxAttr<U>,
    item: T,
    handleChange: (id: string | number, name: U, value: boolean) => void;
}
export type RadioAttr<Name extends string> = InputAttr<'radio', Name> & { multiple?: boolean, options: readonly (readonly [label: string, value: string | number])[]; };
export type SelectAttr<Name extends string> = InputAttr<'select', Name> & { multiple?: boolean, options: readonly (readonly [label: string, value: string | number])[]; };
export interface SelectParam<T extends DataObj<SelectAttr<U>>, U extends keyof T & string> {
    field: SelectAttr<U>,
    item: T,
    handleChange: (id: string | number, name: U, value: string) => void;
}
interface IterableGroup<Name extends string> {
    type: 'iterable-group';
    name: Name;
    label?: React.ReactNode,
    prefix?: React.ReactNode,
    suffix?: React.ReactNode,
    model: readonly AttributeBase[];
}
interface GroupInput<Name extends string> {
    type: 'group';
    name: Name;
    label?: React.ReactNode,
    prefix?: React.ReactNode,
    suffix?: React.ReactNode,
    direction?: "horizontal" | "vertical",
    model: readonly AttributeBase[];
}
export interface InputParam<T extends DataObj<{ name: U, type: InputType; }>, U extends keyof T & string> {
    field: InputAttr<InputType, U>,
    item: T,
    handleChange: (id: string | number, name: U, value: string | number) => void;
}

export type DataObj<T extends AttributeBase> = {
    [name in T['name']]: InputDataType<T>;
};
export type DataModel<FM extends readonly AttributeBase[]> = FM extends []
    ? {}
    : FM extends [AttributeBase]
    ? DataObj<FM[0]>
    : DataObj<FM[0]> & DataModel<FM extends [AttributeBase, ...infer R] ? R : []>;
// export type DataModel<FM extends AttributeBase[]> = FM extends 1
//     ? DataObj<FM[0]>
//     : FM extends 2
//     ? DataObj<FM[0]> & DataObj<FM[1]>
//     : FM extends 3
//     ? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]>
//     : FM extends 4
//     ? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]>
//     : FM extends 5
//     ? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]>
//     : FM extends 6
//     ? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]>
//     : FM extends 7
//     ? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]> & DataObj<FM[6]>
//     : FM extends 8
//     ? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]> & DataObj<FM[6]> & DataObj<FM[7]>
//     : FM extends 9
//     ? DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]> & DataObj<FM[6]> & DataObj<FM[7]> & DataObj<FM[8]>
//     : DataObj<FM[0]> & DataObj<FM[1]> & DataObj<FM[2]> & DataObj<FM[3]> & DataObj<FM[4]> & DataObj<FM[5]> & DataObj<FM[6]> & DataObj<FM[7]> & DataObj<FM[8]> & DataObj<FM[9]>
//     ;



type WithOnChange<T> = T & {
    onChange?: (data: any, setData: React.Dispatch<React.SetStateAction<any>>) => any;
};

