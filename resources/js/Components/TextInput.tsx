import { ComponentProps, ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
type Prop = {
    type: string, name: string, id?: string, value?: string,
    label?: string,
    prefix?: string, suffix?: string,
    className?: string, required?: boolean, autoComplete?: string, isFocused?: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any, underlineStyle?: boolean,
    customValidator?: (value: string) => { validity: boolean, errorMessage: string; };
} & ComponentProps<"input">;

/**
 *
 * id指定無しの場合はnameとおなじになる
 */
export default function TextInput(
    {
        type = 'text',
        name,
        id,
        value, // TODO controlledもuncontrolledも対応する。valueありonchangeありでcontorolled。どちらもなしでuncontrolled
        label = "",
        prefix = "",
        suffix = "",
        className,
        autoComplete,
        required,
        isFocused,
        onChange = () => { },
        underlineStyle,
        defaultValue,
        customValidator,
        readOnly,
        ...rest
    }: Prop
) {
    const [error, setError] = useState<ReactNode>("");
    function addError(msg: ReactNode) {
        setError(error => !!error ? <>{error}<br />{msg}</> : msg);
    }
    const input = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isFocused && input.current) {
            input.current.focus();
        }
    }, []);
    // function validate(){

    // }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setError(undefined);
        const { validity, validationMessage } = e.target;
        if (!validity.valid) {
            addError(validationMessage); // native validation message prioritized over custom message
        }
        if (customValidator) {
            const { validity: customValidity, errorMessage } = customValidator(e.target.value);
            if (!customValidity) {
                addError(errorMessage);
            } else {
                onChange(e);
            }
        }
        if (validity.valid) {
            onChange(e);
        }

    }
    return (
        <label className='flex flex-col gap-1'>
            {label}
            <div className="inline-flex flex-row gap-1 items-end">
                {prefix}
                <input
                    ref={input}
                    maxLength={128}
                    min={-99999}
                    max={99999}
                    {...rest}
                    type={type}
                    name={name}
                    id={id ?? name}
                    value={value}
                    autoFocus={false}
                    className={
                        (underlineStyle
                            ? `border-0 border-b-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 backdrop-blur read-only:bg-stone-50 read-only:focus:border-cyan-700/30 read-only:focus:ring-cyan-700/30 `
                            : `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 invalid:border-red-300 focus:invalid:border-red-300 focus:invalid:ring-red-300 rounded-md shadow-sm read-only:bg-stone-50 read-only:focus:border-cyan-700/30 read-only:focus:ring-cyan-700/30 `) + className
                    }
                    autoComplete={autoComplete}
                    required={required}
                    readOnly={readOnly}
                    onChange={handleChange}
                />
                {suffix}
            </div>
        </label>
    );
}
