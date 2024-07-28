import { useMemo } from 'react';
import Label from './Label';
import Fieldset from './Fieldset';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import TextareaInput from './TextareaInput';
import Group from './Group';
import IterableGroup from './IterableGroup';
import CheckboxLabel from './CheckboxLabel';
import Checkbox from './Checkbox';
import Radio from './Radio';
import AttributeBase from '@/types/AttributeBase';

interface InputProp {
    id: string;
    prop: AttributeBase,
    handleChange: (key: string, value: any) => void,
    value: any,
};
export default function Input({ id, prop, handleChange, value }: InputProp) {
    const el = useMemo(() => {
        switch (prop.type) {
            case 'hidden':
                return <></>;
            case 'group':
                return <Fieldset label={prop.label}>{/*@ts-expect-error*/}
                    <Group id={id} model={prop.model} value={value} direction={prop.direction ?? "vertical"} onChange={(_value) => handleChange(prop.name, _value)} />
                </Fieldset>;
            case 'iterable-group':
                return <Fieldset label={prop.label} overflowScroll={false}>{/*@ts-expect-error*/}
                    <IterableGroup id={id} model={prop.model} value={value} onChange={(_value) => handleChange(prop.name, _value)} />
                </Fieldset>;
            case 'select':
                return <Label {...prop}>{/*@ts-expect-error*/}
                    <SelectInput
                        id={id}
                        {...prop}
                        className="w-full md:w-auto"
                        value={value}
                        onChange={(e) => handleChange(prop.name, e.target.value)}
                    />
                </Label>;
            case 'checkbox':
                return <CheckboxLabel {...prop}>
                    <Checkbox
                        id={id}
                        {...prop}
                        value={value}
                        onChange={(e) => handleChange(prop.name, e.target.checked)} />
                </CheckboxLabel>;
            case 'radio':{/*@ts-expect-error*/}
                return <Radio
                    id={id}
                    {...prop}
                    value={value}
                    onChange={(e) => handleChange(prop.name, e.target.value)}
                />;
            case 'textarea':
                return <Label {...prop}>
                    <TextareaInput /*@ts-expect-error*/
                        id={id}
                        {...prop}
                        name={prop.name}
                        className="w-full md:w-auto"
                        value={value}
                        onChange={(e) => handleChange(prop.name, e.target.value)}
                    />
                </Label>;
            default:
                return <Label {...prop}>{/*@ts-expect-error*/}
                    <TextInput
                        id={id}
                        {...prop}
                        className="w-full md:w-auto"
                        value={value}
                        onChange={(e) => handleChange(prop.name, e.target.value)}
                    />
                </Label>;
        };
    }, [value]);
    return el;
}
