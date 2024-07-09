import UserBase from '../User/UserBase';
import WithoutMethods from '../common/WithoutMethods';

export default class GroupBase {
	public name: string;
	public description: string;
	public users: UserBase[] | null;
	constructor(group: WithoutMethods<GroupBase>) {
		this.name = group.name;
		this.description = group.description;
		this.users = group.users ? group.users.map(user => new UserBase(user)) : null;
	}
	toJSON() {
		return {
			name: this.name,
			description: this.description,
			...(this.users ? { users: this.users?.map(user => user.toJSON()) } : {})
		};
	}
}
