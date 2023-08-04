import type { Rectangle } from "pixi.js";
import { Container, Graphics, Sprite, Texture } from "pixi.js";
import type { IHitbox } from "./IHitbox";

export class Spikes extends Container implements IHitbox {
	private hitbox: Graphics;
	private spike: Sprite;

	constructor() {
		super();

		this.spike = new Sprite(Texture.from("package-1/jumpingCatFlash/spikes.png"));

		this.hitbox = new Graphics();
		this.hitbox.beginFill(0xff0000, 0.3);
		this.hitbox.drawRect(0, 0, this.spike.width, this.spike.height);
		this.hitbox.endFill;
		this.hitbox.visible = false;

		this.addChild(this.spike);
		this.spike.addChild(this.hitbox);
	}

	public getHitbox(): Rectangle {
		return this.hitbox.getBounds();
	}
}
