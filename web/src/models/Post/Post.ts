import { User } from 'User';
export interface IPostData {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	content: string;
}
export interface IPostInputData {
	title: string;
	content: string;
}
export interface IPost {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	title: string;
	content: string;
	authorId: number;
	author?: User;
}

export class Post implements IPost {
	#id?: number;
	#createdAt?: Date;
	#updatedAt?: Date;
	#title: string;
	#content: string;
	#authorId: number;
	constructor(arg: {
		id?: number,
		createdAt?: Date,
		updatedAt?: Date,
		title: string,
		content: string,
		authorId: number;
	}) {
		this.#id = arg.id;
		this.#createdAt = arg.createdAt;
		this.#updatedAt = arg.updatedAt;
		this.#title = arg.title;
		this.#content = arg.content;
		this.#authorId = arg.authorId;
	}
	get id(): number {
		if (this.#id === undefined) throw new Error("id is undefined");
		return this.#id;
	}
	get createdAt(): Date {
		if (this.#createdAt === undefined) throw new Error("createdAt is undefined");
		return this.#createdAt;
	}
	get updatedAt(): Date {
		if (this.#updatedAt === undefined) throw new Error("updatedAt is undefined");
		return this.#updatedAt;
	}
	get title(): string {
		return this.#title;
	}
	get content(): string {
		return this.#content;
	}
	get authorId(): number {
		return this.#authorId;
	}
}
