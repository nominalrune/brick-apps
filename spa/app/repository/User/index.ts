import Api from '~/lib/api';
import User from '~/model/User/User';
import RepositoryBase from '../common/RepositoryBase';

export default class UserRepository extends RepositoryBase<User> {
	constructor() {
		super('/users');
	}
}