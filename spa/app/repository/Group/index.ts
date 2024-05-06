import Group from '~/model/Group/Group';
import RepositoryBase from '../common/RepositoryBase';

export default class GroupRepository extends RepositoryBase<Group>{
	constructor() {
		super('groups');
	}
	async get() {
		return await super.get();
	}
	async find(id: number) {
		return await super.get(id);
	}
	async create(group: GroupWithoutId) {
		return await super.create('groups', group);
	}
	async update(group: Group) {
		return await super.post(`groups/${group.id}`, group);
	}
	async delete(id: number) {
		return await super.delete(`groups/${id}`);
	}
}