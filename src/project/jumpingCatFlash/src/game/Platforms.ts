import type { Rectangle } from "pixi.js";
import { Container, Graphics, Sprite, Texture } from "pixi.js";
import type { IHitbox } from "./IHitbox";

export class Platform extends Container implements IHitbox {
	public static readonly BUNDLES = ["package-1"];
	private hitbox: Graphics;
	private platform: Sprite;

	constructor() {
		super();

		// plataforma
		this.platform = new Sprite(Texture.from("package-1/jumpingCatFlash/platform-long.png"));
		this.platform.anchor.set(0.5);
		this.hitbox = new Graphics();
		this.hitbox.beginFill(0xff0000, 0.3);
		this.hitbox.drawRect(-this.platform.width * 0.5, -this.platform.height * 0.5, this.platform.width, this.platform.height);
		this.hitbox.endFill;
		this.hitbox.visible = true;

		// anchor point
		const auxZero = new Graphics();
		auxZero.beginFill(0xff00ff);
		auxZero.drawCircle(0, 0, 10);
		auxZero.endFill();
		auxZero.visible = true;
		this.addChild(this.platform);
		this.platform.addChild(auxZero, this.hitbox);
	}

	public getHitbox(): Rectangle {
		return this.hitbox.getBounds();
	}
}
