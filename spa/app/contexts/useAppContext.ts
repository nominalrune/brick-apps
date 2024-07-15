import { useContext } from 'react';
import AppContext from './AppContext';

export default function useAppContext() {
	const context = useContext(AppContext);
	if (!context) {
	throw new Error('AppContext not found');
	}
	return context;
}