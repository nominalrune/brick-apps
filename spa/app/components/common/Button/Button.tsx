import { twMerge } from 'tailwind-merge';
type ButtonProps = {
} & JSX.IntrinsicElements['button'];

export default function Button({ children, onClick, className, ...props }: ButtonProps) {
	return (
		<button onClick={onClick} className={twMerge("relative flex justify-center items-center m-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded", className)} {...props}>
			{children}
		</button>
	);
}