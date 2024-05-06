import User from '../User/User';
import WithoutMethods from '../common/WithoutMethods';
import Group from './Group';

export default class GroupWithoutId {
	public name: string;
	public description: string;
	public users: User[];
	constructor(group: Omit<WithoutMethods<Group>, "id">) {
		this.name = group.name;
		this.description = group.description;
		this.users = group.users.map(user=>new User(user));
	}
	toJSON() {
		return {
			name: this.name,
			description: this.description,
			users: this.users.map(user=>user.toJSON()),
		};
	}
	static blank() {
		return new GroupWithoutId({
			name: "",
			description: "",
			users: [],
		});
	}
}
