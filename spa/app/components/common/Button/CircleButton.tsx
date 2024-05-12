import { twMerge } from 'tailwind-merge';
interface CircleButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	className: string;
}

export default function CircleButton({ children, onClick, className = "size-5", ...props }: CircleButtonProps) {
	return (
		<button onClick={onClick} className={twMerge("rounded-full flex justify-center items-center bg-blue-600 hover:bg-blue-500 text-white", className)} {...props}>
			{children}
		</button>
	);
}