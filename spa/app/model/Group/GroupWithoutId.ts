import User from '../User/User';
import { IGroup } from './IGroup';

export default class GroupWithoutId {
	public name: string;
	public description: string;
	public users: User[];
	constructor(group: Omit<IGroup, "id">) {
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
