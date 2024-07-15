import { createContext } from 'react';
import App from '~/model/App/App';

const AppContext = createContext<App | undefined>(undefined);
export default AppContext;