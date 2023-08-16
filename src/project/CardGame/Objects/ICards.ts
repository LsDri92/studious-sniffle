export interface ICards {
	number: number;
	type: string;
	value: number;
}

export interface Spanish {
	type: string;
	number: number;
	value: number;
}

export interface American {
	americanCardType: AmericanType;
	americanCardColor: string;
	americanCardNumber: number;
	americanCardValue: number;
}

export enum SpanishType {
	BASTO = "BASTO",
	ESPADA = "ESPADA",
	COPA = "COPA",
	ORO = "ORO",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type spanishCardType = "basto" | "espada" | "copa" | "oro";

export enum AmericanType {
	DIAMOND = "DIAMOND",
	SPADE = "SPADE",
	CLOVER = "CLOVER",
	HEART = "HEART",
}
