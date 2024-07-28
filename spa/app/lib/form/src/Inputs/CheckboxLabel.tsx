import { ReactNode } from 'react';

interface OuterProps {
    label?: ReactNode,
    children: ReactNode,
    prefix?: ReactNode,
    suffix?: ReactNode,
}
export default function CheckboxLabel({ label, children, prefix, suffix }: OuterProps) {
    return <label key={'input_' + label?.toString()} className='flex flex-row gap-1 items-baseline break-keep'>
        {prefix}
            {children}
            {suffix}
        {label}
    </label>;
}