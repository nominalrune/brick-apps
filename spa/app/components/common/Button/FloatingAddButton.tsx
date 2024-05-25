import AddButton from './AddButton';

export default function FloatingAddButton({ onClick, className }: { onClick: () => void; className?: string; }) {
	return <AddButton
		className={className}
		onClick={onClick}
	/>;
}
