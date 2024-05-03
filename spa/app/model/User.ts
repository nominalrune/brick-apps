import Profile from './Profile';
import UserData from './UserData';

export default class User {
	public readonly email: string;
	public readonly profile: Profile | null;
	constructor(user: IUser) {
		this.email = user.email;
		this.profile = user.profile;
	}
	static fromData(data: UserData) {
		return new User({
			email: data.email,
			profile: data.profile ? Profile.fromData(data.profile) : null,
		});
	}
	toJSON() {
		return {
			email: this.email,
			profile: this.profile?.toJSON(),
		};
	}
	static blank(){
		return new User({email:'',profile:Profile.blank()});
	}
}

interface IUser {
	email: string;
	profile: Profile | null;
}
