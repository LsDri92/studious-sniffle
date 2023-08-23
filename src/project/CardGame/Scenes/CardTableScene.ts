import Random from "../../../engine/random/Random";
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
		// const player1 = { name: "Jorge", points: 0 };
		// const player2 = { name: "Anibal", points: 0 };

		// [0]fours; [1]fives; [2]six; [3]ten; [4]eleven; [5]twelve
		const trucoValueNormal = [1, 2, 3, 4, 5, 6];
		// [0]seven:copa, basto; [1]one: copa/oro; [2]two; [3]three; [4]seven oro; [5]seven espada; [6]one basto; [7]one espada;
		const trucoValueSpecial = [7, 8, 9, 10, 11, 12, 13, 14];

		cartas.createDeck();
		// deck[0] = basto; deck[1] = espada; deck[2] = copa; deck[3] = oro

		cartas.deck[0].splice(7, 2);
		cartas.deck[1].splice(7, 2);
		cartas.deck[2].splice(7, 2);
		cartas.deck[3].splice(7, 2);

		cartas.deck[0][0].value = trucoValueSpecial[6];
		cartas.deck[0][1].value = trucoValueSpecial[2];
		cartas.deck[0][2].value = trucoValueSpecial[3];
		cartas.deck[0][3].value = trucoValueNormal[0];
		cartas.deck[0][4].value = trucoValueNormal[1];
		cartas.deck[0][5].value = trucoValueNormal[2];
		cartas.deck[0][6].value = trucoValueSpecial[0];
		cartas.deck[0][7].value = trucoValueNormal[3];
		cartas.deck[0][8].value = trucoValueNormal[4];
		cartas.deck[0][9].value = trucoValueNormal[5];

		cartas.deck[1][0].value = trucoValueSpecial[7];
		cartas.deck[1][1].value = trucoValueSpecial[2];
		cartas.deck[1][2].value = trucoValueSpecial[3];
		cartas.deck[1][3].value = trucoValueNormal[0];
		cartas.deck[1][4].value = trucoValueNormal[1];
		cartas.deck[1][5].value = trucoValueNormal[2];
		cartas.deck[1][6].value = trucoValueSpecial[5];
		cartas.deck[1][7].value = trucoValueNormal[3];
		cartas.deck[1][8].value = trucoValueNormal[4];
		cartas.deck[1][9].value = trucoValueNormal[5];

		cartas.deck[2][0].value = trucoValueSpecial[1];
		cartas.deck[2][1].value = trucoValueSpecial[2];
		cartas.deck[2][2].value = trucoValueSpecial[3];
		cartas.deck[2][3].value = trucoValueNormal[0];
		cartas.deck[2][4].value = trucoValueNormal[1];
		cartas.deck[2][5].value = trucoValueNormal[2];
		cartas.deck[2][6].value = trucoValueSpecial[0];
		cartas.deck[2][7].value = trucoValueNormal[3];
		cartas.deck[2][8].value = trucoValueNormal[4];
		cartas.deck[2][9].value = trucoValueNormal[5];

		cartas.deck[3][0].value = trucoValueSpecial[1];
		cartas.deck[3][1].value = trucoValueSpecial[2];
		cartas.deck[3][2].value = trucoValueSpecial[3];
		cartas.deck[3][3].value = trucoValueNormal[0];
		cartas.deck[3][4].value = trucoValueNormal[1];
		cartas.deck[3][5].value = trucoValueNormal[2];
		cartas.deck[3][6].value = trucoValueSpecial[0];
		cartas.deck[3][7].value = trucoValueNormal[3];
		cartas.deck[3][8].value = trucoValueNormal[4];
		cartas.deck[3][9].value = trucoValueNormal[5];

		console.log(cartas.deck);

		const mano1 = this.repartirPlayer1(cartas.deck);
		const mano2 = this.repartirPlayer2(cartas.deck);

		this.esMayorQue(Random.shared.pickOne(mano1), Random.shared.pickOne(mano2));
	}

	private repartirPlayer1(deck: Cards[][]): Cards[] {
		const mano1: Array<Cards> = [];

		const realDeck: Array<Cards> = deck[0].concat(deck[1], deck[2], deck[3]);

		const carta1 = Random.shared.pickOne(realDeck);
		const carta2 = Random.shared.pickOne(realDeck);
		const carta3 = Random.shared.pickOne(realDeck);
		mano1.push(carta1, carta2, carta3);
		console.log(mano1);
		return mano1;
	}
	private repartirPlayer2(deck: Cards[][]): Cards[] {
		const mano1: Array<Cards> = [];

		const realDeck: Array<Cards> = deck[0].concat(deck[1], deck[2], deck[3]);

		const carta1 = Random.shared.pickOne(realDeck);
		const carta2 = Random.shared.pickOne(realDeck);
		const carta3 = Random.shared.pickOne(realDeck);
		mano1.push(carta1, carta2, carta3);
		console.log(mano1);
		return mano1;
	}

	private esMayorQue(carta1: Cards, carta2: Cards): void {
		if (carta1.value > carta2.value) {
			console.log(`gana ${carta1.type} ${carta1.number} pierde ${carta2.type} ${carta2.number}`);
		} else {
			console.log(`gana ${carta2.type} ${carta2.number} pierde ${carta1.type} ${carta1.number}`);
		}
	}
}
