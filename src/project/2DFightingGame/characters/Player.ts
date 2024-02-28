import type { AnimatedSprite, Graphics } from "pixi.js";
import { PhysicsContainer } from "../../../engine/utils/PhysicsContainer";
import type { IHitable } from "../../../engine/collision/IHitable";

export class Player extends PhysicsContainer {
	private animatedSprite: AnimatedSprite;
	private attackBox: Graphics & IHitable;
	private defenseBox: Graphics & IHitable;
	private life: number = 100;
	constructor() {
		super();
		console.log(this.animatedSprite, this.attackBox, this.defenseBox, this.life);
	}
}
