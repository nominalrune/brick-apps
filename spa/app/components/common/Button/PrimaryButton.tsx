import { ReactNode } from 'react';
import Button from "./Button";
interface Props {
	children: ReactNode;
	onClick?: (e: MouseEvent) => any;
	className?: string;
}
export default function PrimaryButton({ children }:Props) { }