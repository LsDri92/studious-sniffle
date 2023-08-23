import { Cards } from "./Cards";
import type { Spanish as Spanish, spanishCardType } from "./ICards";

export class SpanishCards {
	public basto: Array<Cards> = [];
	public espada: Array<Cards> = [];
	public copa: Array<Cards> = [];
	public oro: Array<Cards> = [];
	public cardNumber: number;
	public deck: Array<Cards[]> = [];

	constructor() {
		// this.createDeck();
	}

	public createDeck(): any {
		for (let i = 1; i <= 12; i++) {
			const spanishCards: Record<spanishCardType, Spanish> = {
				basto: { type: "basto", number: i, value: 0 },
				espada: { type: "espada", number: i, value: 0 },
				copa: { type: "copa", number: i, value: 0 },
				oro: { type: "oro", number: i, value: 0 },
			};

			const basto = new Cards(spanishCards.basto.type, spanishCards.basto.number, spanishCards.basto.value);
			this.basto.push(basto);
			const espada = new Cards(spanishCards.espada.type, spanishCards.espada.number, spanishCards.espada.value);
			this.espada.push(espada);
			const copa = new Cards(spanishCards.copa.type, spanishCards.copa.number, spanishCards.copa.value);
			this.copa.push(copa);
			const oro = new Cards(spanishCards.oro.type, spanishCards.oro.number, spanishCards.oro.value);
			this.oro.push(oro);
		}
		console.log(this.basto, this.espada, this.copa, this.oro);
		this.deck.push(this.basto, this.espada, this.copa, this.oro);
		return this.deck;
	}
}
