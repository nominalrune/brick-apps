import { twMerge } from 'tailwind-merge';
type ButtonProps = {
} & JSX.IntrinsicElements['button'];

export default function Button({ children, onClick, className = "size-5", ...props }: ButtonProps) {
	return (
		<button onClick={onClick} className={twMerge("px-3 py-1 bg-slate-100 hover:bg-slate-200", className)} {...props}>
			{children}
		</button>
	);
}