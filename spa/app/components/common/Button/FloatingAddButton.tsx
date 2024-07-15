import AddButton from './AddButton';

export default function FloatingAddButton({ onClick = () => void 0, className }: { onClick?: () => void; className?: string; }) {
	return <AddButton
		className={className}
		onClick={onClick}
	/>;
}
