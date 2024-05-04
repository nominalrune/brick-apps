import Profile from '../Profile/Profile';
import IUser from './IUser';
import UserData from './UserData';
import UserWithoutId from './UserWithoutId';

export default class User extends UserWithoutId{
	public readonly id: number;
	constructor(user: IUser) {
		super(user);
		this.id = user.id;
	}
	static fromData(data: UserData) {
		return new User({
			id: data.id,
			email: data.email,
			profile: data.profile ? Profile.fromData(data.profile) : null,
		});
	}
	toJSON() {
		return {
			id: this.id,
			email: this.email,
			profile: this.profile?.toJSON(),
		};
	}
}

