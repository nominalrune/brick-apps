import User from '../User/User';
import GroupData from './GroupData';
import GroupWithoutId from './GroupWithoutId';
import { IGroup } from './IGroup';

export default class Group extends GroupWithoutId {
	public readonly id: number;
	public readonly users: User[];
	constructor(group: IGroup) {
		super(group);
		this.id = group.id;
		this.users = group.users.map(user=>new User(user));
	}
	static fromData(data: GroupData) {
		return new Group({
			id: data.id,
			name: data.name,
			description: data.description,
			users: data.users.map(user => User.fromData(user)),
		});
	}
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			users: this.users.map(user => user.toJSON()),
		};
	}
}
