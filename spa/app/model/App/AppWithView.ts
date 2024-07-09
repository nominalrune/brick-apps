import WithoutMethods from '../common/WithoutMethods';
import App from './App';
import View from './View/View';

export default class AppWithView extends App {
	public view: View;
	constructor(app: WithoutMethods<App>, view: WithoutMethods<View>) {
		super(app);
		this.view = new View(view);
	}
};