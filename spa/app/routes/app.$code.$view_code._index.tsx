import ErrorBoundary from '~/components/layouts/ErrorBoundary';
import RecordList from '~/components/Record/RecordList';
import useAppContext from '~/contexts/useAppContext';
import ListLayout from '~/model/App/View/ListLayout';

export default function Index() {
	const app = useAppContext();
	return <>
		<ErrorBoundary>
			<RecordList app={app} />
		</ErrorBoundary>
	</>;
}