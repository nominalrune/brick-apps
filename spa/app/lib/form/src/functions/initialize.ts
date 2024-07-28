import { DataModel, InputAttribute } from '@/types/commonTypes';

export default function initialize<T extends readonly InputAttribute[]>(properties: T): DataModel<T> {
    function circular(model: readonly InputAttribute[]): DataModel<T> {
        return model.reduce((acc, curr) => {
            if (curr.type === 'iterable-group') {
                return { ...acc, [curr.name]: [circular(curr.model)] };
            } else if (curr.type === 'group') {
                return { ...acc, [curr.name]: circular(curr.model) };
            } else {
                return { ...acc, [curr.name]: curr?.defaultValue ?? "" };
            }
        }, {} as DataModel<T>);
    }
    return circular(properties);
}