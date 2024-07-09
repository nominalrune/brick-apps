export default interface IValueBase {
	[Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): string | number | boolean;
	toString(): string;
	toJSON(): object;
	clone(): this;
	fromData(data: any): this;
}