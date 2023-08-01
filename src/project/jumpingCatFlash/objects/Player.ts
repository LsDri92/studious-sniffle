import type { Rectangle } from "pixi.js";
import { AnimatedSprite, Graphics, Texture } from "pixi.js";
import { PhysicsContainer } from "../utils/PhysicsContainer";
import type { IHitbox } from "../utils/IHitbox";
import { Keyboard } from "../../../engine/input/Keyboard";

export class Player extends PhysicsContainer implements IHitbox {
	private static readonly GRAVITY = 600;
	private static readonly MOVE_PLAYER = 220;

	public canJump = true;
	public life = 100;

	private runningCatFlash: AnimatedSprite;
	private physCat: PhysicsContainer;
	private hitbox: Graphics;
	/* private idleCat: AnimatedSprite; */

	constructor() {
		super();

		// animated sprite run
		this.runningCatFlash = new AnimatedSprite(
			[
				Texture.from("runcat1"),
				Texture.from("runcat2"),
				Texture.from("runcat3"),
				Texture.from("runcat4"),
				Texture.from("runcat5"),
				Texture.from("runcat6"),
				Texture.from("runcat7"),
				Texture.from("runcat8"),
			],
			false
		);

		this.runningCatFlash.play();
		this.runningCatFlash.anchor.set(0.5, 0.5);
		this.runningCatFlash.animationSpeed = 0.2;

		// physics cat
		this.physCat = new PhysicsContainer();
		this.physCat.speed.x = 300;
		this.physCat.speed.y = 100;
		this.physCat.acceleration.y = 10;
		this.addChild(this.physCat);

		// anchor point
		const auxZero = new Graphics();
		auxZero.beginFill(0xff00ff);
		auxZero.drawCircle(0, 0, 5);
		auxZero.endFill();
		auxZero.visible = false;

		this.hitbox = new Graphics();
		this.hitbox.beginFill(0xff00ff, 0.3);
		this.hitbox.drawRect(-20, -20, this.runningCatFlash.width, this.runningCatFlash.height);
		this.hitbox.endFill;
		this.hitbox.visible = false;

		this.addChild(this.runningCatFlash);
		this.runningCatFlash.addChild(auxZero);
		this.runningCatFlash.addChild(this.hitbox);

		this.acceleration.y = Player.GRAVITY;

		if (Keyboard.shared.justPressed("ArrowUp")) {
			this.jump;
		}
	}

	public override destroy(options: any): void {
		super.destroy(options);
		if (Keyboard.shared.justPressed("ArrowUp")) {
			this.jump;
		}
	}

	public override update(deltaMS: number): void {
		super.update(deltaMS / 1000);
		this.runningCatFlash.update(deltaMS / (1000 / 60));

		if (Keyboard.shared.justPressed("ArrowRight")) {
			this.speed.x = Player.MOVE_PLAYER;
			this.runningCatFlash.scale.x = 1;
		} else if (Keyboard.shared.justPressed("ArrowLeft")) {
			this.speed.x = -Player.MOVE_PLAYER;
			this.runningCatFlash.scale.x = -1;
		} else {
			this.speed.x = 0;
		}

		if (Keyboard.shared.justPressed("ArrowUp")) {
			this.jump();
		}
	}

	private jump(): void {
		if (this.canJump) {
			this.canJump = false;

			this.speed.y = -400;
		}
	}

	public getDamage(): void {
		this.life -= 1;
	}

	public getHitbox(): Rectangle {
		return this.hitbox.getBounds();
	}
}
