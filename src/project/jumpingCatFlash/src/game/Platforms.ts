import type { Rectangle } from "pixi.js";
import { Container, Graphics, Sprite, Texture } from "pixi.js";
import type { IHitbox } from "../utils/IHitbox";
import { HitPoly } from "../../../../engine/collision/HitPoly";

export class Platform extends Container implements IHitbox {
	public hitbox: HitPoly;
	private platform: Sprite;

	constructor() {
		super();

		// plataforma
		this.platform = new Sprite(Texture.from("package-1/jumpingCatFlash/platform-long.png"));
		this.platform.anchor.set(0.5);
		this.hitbox = HitPoly.makeBox(-this.platform.width * 0.5, -this.platform.height * 0.3, this.platform.width, this.platform.height * 0.8, false);

		// anchor point
		const auxZero = new Graphics();
		auxZero.beginFill(0xff00ff);
		auxZero.drawCircle(0, 0, 10);
		auxZero.endFill();
		auxZero.visible = false;
		this.addChild(this.platform);
		this.platform.addChild(auxZero, this.hitbox);
	}

	public getHitbox(): Rectangle {
		return this.hitbox.getBounds();
	}
}
