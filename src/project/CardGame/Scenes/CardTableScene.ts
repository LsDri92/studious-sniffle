import { PixiScene } from "../../../engine/scenemanager/scenes/PixiScene";
import type { Cards } from "../Objects/Cards";
import { SpanishCards } from "../Objects/CartasEspañolas";

export class CardTableScene extends PixiScene {
	constructor() {
		super();
		this.truco();
	}

	private truco(): void {
		const cartas = new SpanishCards();

		// fours; fives; six; ten; eleven; twelve
		const trucoValueNormal = [1, 2, 3, 4, 5, 6];
		// seven:copa, basto; one: copa/oro; two; three; seven oro; seven espada; one basto; one espada;
		const trucoValueSpecial = [7, 8, 9, 10, 11, 12, 13, 14];
		cartas.createDeck();
		// deck0 = basto; deck1 = espada; deck2 = copa; deck3 = oro
		cartas.deck[0][1].value = trucoValueSpecial[7];
		cartas.deck[0][2].value = trucoValueSpecial[3];
		cartas.deck[0][3].value = trucoValueSpecial[4];
		cartas.deck[0][4].value = trucoValueNormal[0];
		cartas.deck[0][5].value = trucoValueNormal[1];
		cartas.deck[0][6].value = trucoValueNormal[2];
		cartas.deck[0][7].value = trucoValueSpecial[0];
		cartas.deck[0][10].value = trucoValueNormal[3];
		cartas.deck[0][11].value = trucoValueNormal[4];
		cartas.deck[0][12].value = trucoValueNormal[5];

		console.log(cartas.deck[0]);
		this.esMayorQue(cartas.deck[0][12], cartas.deck[0][7]);
	}

	private esMayorQue(carta1: Cards, carta2: Cards): void {
		if (carta1.value > carta2.value) {
			console.log(`gana ${carta1.type} ${carta1.number}`);
		} else {
			console.log(`gana ${carta2.type} ${carta2.number}`);
		}
	}
}
