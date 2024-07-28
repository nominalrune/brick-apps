import { ReactNode } from 'react';

interface OuterProps {
    label?: ReactNode,
    children: ReactNode,
    prefix?: ReactNode,
    suffix?: ReactNode,
}
export default function Label({ label, children, prefix, suffix }: OuterProps) {
    return <label className={`group/input flex flex-col gap-[.2rem]`}>
        <div className={`text-slate-600 dark:text-slate-300 group-focus-within/input:text-slate-950 dark:group-focus-within/fieldset:text-slate-50`}>{label}</div>
        <label className="flex flex-row gap-1 items-end">
            {prefix}
            {children}
            {suffix}
        </label>
    </label>;
}