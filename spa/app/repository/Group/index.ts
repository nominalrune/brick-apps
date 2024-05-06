import Group from '~/model/Group/Group';
import RepositoryBase from '../common/RepositoryBase';
import NewGroup from '~/model/Group/NewGroup';

export default class GroupRepository extends RepositoryBase<NewGroup, Group>{
	constructor() {
		super('groups');
	}
	async get() {
		return await super.get();
	}
	async find(id: number) {
		return await super.find(id);
	}
	async create(group: NewGroup) {
		return await super.create(group);
	}
	async update(group: Group) {
		return await super.update(group);
	}
	async delete(id: number) {
		return await super.delete(id);
	}
}