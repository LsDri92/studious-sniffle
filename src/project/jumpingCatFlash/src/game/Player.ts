import type { Rectangle } from "pixi.js";
import { AnimatedSprite, Graphics, Texture } from "pixi.js";
import type { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../../../../engine/input/Keyboard";
import { Key } from "../../../../engine/input/Key";

export class Player extends PhysicsContainer implements IHitbox {
	public static readonly BUNDLES = ["package-1"];
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
				Texture.from("package-1/jumpingCatFlash/runcat/runcat1.png"),
				Texture.from("package-1/jumpingCatFlash/runcat/runcat2.png"),
				Texture.from("package-1/jumpingCatFlash/runcat/runcat3.png"),
				Texture.from("package-1/jumpingCatFlash/runcat/runcat4.png"),
				Texture.from("package-1/jumpingCatFlash/runcat/runcat5.png"),
				Texture.from("package-1/jumpingCatFlash/runcat/runcat6.png"),
				Texture.from("package-1/jumpingCatFlash/runcat/runcat7.png"),
				Texture.from("package-1/jumpingCatFlash/runcat/runcat8.png"),
			],
			false
		);

		this.runningCatFlash.play();
		this.runningCatFlash.anchor.set(0.5, 0.5);
		this.runningCatFlash.animationSpeed = 0.2;

		// physics cat
		this.physCat = new PhysicsContainer();
		this.addChild(this.physCat);

		// anchor point
		const auxZero = new Graphics();
		auxZero.beginFill(0xff00ff);
		auxZero.drawCircle(0, 0, 5);
		auxZero.endFill();
		auxZero.visible = true;

		this.hitbox = new Graphics();
		this.hitbox.beginFill(0xff00ff, 0.3);
		this.hitbox.drawRect(-20, -20, this.runningCatFlash.width, this.runningCatFlash.height);
		this.hitbox.endFill;
		this.hitbox.visible = false;

		this.addChild(this.runningCatFlash);
		this.runningCatFlash.addChild(auxZero);
		this.runningCatFlash.addChild(this.hitbox);

		this.acceleration.y = Player.GRAVITY;
	}

	public override destroy(options: any): void {
		super.destroy(options);
	}

	public override update(deltaMS: number): void {
		super.update(deltaMS / 1000);
		this.runningCatFlash.update(deltaMS / (1000 / 60));

		if (Keyboard.shared.justPressed(Key.RIGHT_ARROW)) {
			this.speed.x = Player.MOVE_PLAYER;
			this.runningCatFlash.scale.x = 1;
		}
		if (Keyboard.shared.justPressed(Key.LEFT_ARROW)) {
			this.speed.x = -Player.MOVE_PLAYER;
			this.runningCatFlash.scale.x = -1;
		}
		if (Keyboard.shared.justReleased(Key.LEFT_ARROW) || Keyboard.shared.justReleased(Key.RIGHT_ARROW)) {
			this.speed.x = 0;
		}

		if (Keyboard.shared.justPressed(Key.UP_ARROW)) {
			this.jump();
		}
	}

	private jump(): void {
		if (this.canJump) {
			this.canJump = false;
			this.speed.y = -350;
		}
	}

	public getDamage(): void {
		this.life -= 1;
	}

	public getHitbox(): Rectangle {
		return this.hitbox.getBounds();
	}
}
