import WithoutMethods from '../common/WithoutMethods';
import AppWithView from './AppWithView';
import Column from './Column';
import Record from './Record/Record';
import NewView from './View/NewView';
import View from './View/View';
import ViewData from './View/ViewData';

type AppData = {
	id: number;
    default_view: string;
    name: string;
    description: string;
    code: string;
    icon: string;
    columns: Column[];
    archived_at: Date | null | undefined;
	view?: ViewData;
	records?: Record[];
}
export default AppData;
//  {
// 	name: string;
// 	description: string;
// 	code: string;
// 	icon: string;
// 	columns: Column[];
// 	default_view: string;
// 	archived_at: string | null;
// }