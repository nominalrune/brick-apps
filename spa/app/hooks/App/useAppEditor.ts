import Field from '~/model/App/Field';
import { useState } from 'react';
import NewApp from '~/model/App/NewApp';
import App from '~/model/App/App';
import AppBase from '~/model/App/AppBase';
import WithoutMethods from '~/model/common/WithoutMethods';

const isApp = (app: WithoutMethods<App | NewApp>): app is App => app instanceof App;
const _App = (app: WithoutMethods<AppBase>) => isApp(app) ? new App(app) : new NewApp(app);
/**
 * App編集にて、Model/Appの編集を担う
 */
export default function useAppEditor<T extends AppBase = App | NewApp>(initialAppState: App | NewApp) {
	const [app, setApp] = useState<App | NewApp>(initialAppState);
	type keyName = 'name' | "description" | 'code' | 'icon' | 'fields';
	function update<K extends keyName>(key: K, value: T[K]) {
		setApp(app => _App({ ...app, [key]: value }));
	}
	return { app, update };
}


