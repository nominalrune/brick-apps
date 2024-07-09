import NewProfile from '../Profile/NewProfile';
import WithoutMethods from '../common/WithoutMethods';
import UserBase from './UserBase';

export default class NewUser extends UserBase {
	public password: string;
	constructor(user: WithoutMethods<NewUser>) {
		super(user);
		this.password = user.password;
	}
	static blank() {
		return new NewUser({
			email: '',
			password: '',
			profile: NewProfile.blank(),
			groups: null,
		});
	}
}