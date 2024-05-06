import User from '../User/User';
import WithoutMethods from '../common/WithoutMethods';
import GroupBase from './GroupBase';
import GroupData from './GroupData';

export default class Group extends GroupBase {
	public readonly id: number;
	public users: User[];
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

