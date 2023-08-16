import type { ICards } from "./ICards";

export class Cards implements ICards {
	public number: number;
	public type: string;
	public value: number;

	constructor(type: string, number: number, value: number) {
		this.type = type;
		this.number = number;
		this.value = value;
	}
}
