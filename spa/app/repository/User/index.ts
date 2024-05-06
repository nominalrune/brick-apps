import Api from '~/lib/api';
import User from '~/model/User/User';
import RepositoryBase from '../common/RepositoryBase';
import NewUser from '~/model/User/NewUser';

export default class UserRepository extends RepositoryBase<NewUser, User> {
	constructor() {
		super('/users');
	}
	async find(id: number) {
		const data = await super.find(id);
		return User.fromData(data);
	}
	async get() {
		const data = await super.get();
		return data.map((user: any) => User.fromData(user));
	}
	async create(user: User) {
		const data = await super.create(user);
		return User.fromData(data);
	}
	async update(user: User) {
		const data = await super.update(user);
		return User.fromData(data);
	}
	async archive(id: number) {
		return await this.api.get(`${this.subUrl}/${id}/archive`);
	}
	async delete(id: number) {
		return await super.delete(id);
	}
}