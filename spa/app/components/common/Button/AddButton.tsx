import CircleButton from './CircleButton';
import { FiPlus} from "@react-icons/all-files/fi/FiPlus";

export default function AddButton({ onClick, className="size-6 p-1" }: { onClick: () => void; className?: string; }) {
  return (
	<CircleButton onClick={onClick} className={className}>
	  <FiPlus />
	</CircleButton>
  );
}