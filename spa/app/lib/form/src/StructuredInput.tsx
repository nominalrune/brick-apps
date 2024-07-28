import { DataModel, InputAttribute } from './types/commonTypes';
import Input from './Inputs/Input';

interface StructuredInputProps<T extends readonly InputAttribute[]> {
	properties: T;
	data: DataModel<T>;
	setData: <K extends keyof DataModel<T>&string>(key: K, value:DataModel<T>[K]) => void;
}

export default function StructuredInput<T extends readonly InputAttribute[]>({ properties, data, setData }: StructuredInputProps<T>) {
	return <div className="flex flex-col gap-2">
		{properties.map((prop) => (
			<Input
				key={'input_' + prop.name}
				prop={prop}
				value={data[prop.name]}
				handleChange={setData} />
		))}
	</div>;
}
