import User from '../User/User';
import WithoutMethods from '../common/WithoutMethods';
import GroupData from './GroupData';
import GroupWithoutId from './GroupWithoutId';

export default class Group extends GroupWithoutId {
	public readonly id: number;
	public readonly users: User[];
	constructor(group: WithoutMethods<Group>) {
		super(group);
		this.id = group.id;
		this.users = group.users.map(user=>new User(user));
	}
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			users: this.users.map(user => user.toJSON()),
		};
	}
	static fromData(data: GroupData):Group {
		return new Group({
			id: data.id,
			name: data.name,
			description: data.description,
			users: data.users.map(user => User.fromData(user)),
		});
	}
}

