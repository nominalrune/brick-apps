import GroupBase from './GroupBase';

export default class NewGroup extends GroupBase {
	static blank() {
		return new NewGroup({
			name: "",
			description: "",
			users: [],
		});
	}
}
