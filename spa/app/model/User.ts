import UserData from './UserData';


export default class User{
	public readonly email: string;
	constructor(user: User){
		this.email = user.email;
	}
	static fromData(data:UserData){
		return new User(data);
	}
}
