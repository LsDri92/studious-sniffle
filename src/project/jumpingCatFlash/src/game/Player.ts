import type { Rectangle } from "pixi.js";
import { Graphics, Texture } from "pixi.js";
import type { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
// import { Keyboard } from "../../../../engine/input/Keyboard";
// import { Key } from "../../../../engine/input/Key";
import { HitPoly } from "../../../../engine/collision/HitPoly";
import { StateMachineAnimator } from "../../../../engine/animation/StateMachineAnimation";

export class Player extends PhysicsContainer implements IHitbox {
	public static readonly BUNDLES = ["package-1"];
	public static readonly GRAVITY = 600;
	public static readonly MOVE_PLAYER = 220;

	public canJump: boolean = true;
	public isMoving: boolean = true;
	public life = 100;
	public thereIsGravity: boolean = true;

	private catFlash: StateMachineAnimator;
	private physCat: PhysicsContainer;
	public hitbox: HitPoly;
	/* private idleCat: AnimatedSprite; */

	constructor() {
		super();

		// animated sprite run

		this.catFlash = new StateMachineAnimator();

		this.catFlash.addState(
			"run",
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
			5,
			true
		);

		this.catFlash.addState("idle", [Texture.from("package-1/jumpingCatFlash/runcat/runcat1.png")]);

		this.catFlash.addState(
			"jump",
			[
				Texture.from("package-1/jumpingCatFlash/catjump/catjump2.png"),
				Texture.from("package-1/jumpingCatFlash/catjump/catjump3.png"),
				Texture.from("package-1/jumpingCatFlash/catjump/catjump4.png"),
				Texture.from("package-1/jumpingCatFlash/catjump/catjump5.png"),
				Texture.from("package-1/jumpingCatFlash/catjump/catjump6.png"),
				Texture.from("package-1/jumpingCatFlash/catjump/catjump7.png"),
			],
			1.5,
			false
		);

		this.idle();
		this.catFlash.anchor.set(0.5);
		this.catFlash.animationSpeed = 0.02;

		// physics cat
		this.physCat = new PhysicsContainer();
		this.addChild(this.physCat);

		// anchor point
		const auxZero = new Graphics();
		auxZero.beginFill(0xff00ff);
		auxZero.drawCircle(0, 0, 5);
		auxZero.endFill();
		auxZero.visible = false;

		this.hitbox = HitPoly.makeBox(-this.catFlash.width / 2, -this.catFlash.height / 2, this.catFlash.width, this.catFlash.height, false);

		this.addChild(this.catFlash);
		this.catFlash.addChild(auxZero);
		this.catFlash.addChild(this.hitbox);
	}

	public override destroy(options: any): void {
		super.destroy(options);
	}

	public override update(deltaMS: number): void {
		super.update(deltaMS / 1000);
		this.catFlash.update(deltaMS / (1000 / 60));
	}

	public jump(): void {
		// this.canJump = false;
		this.catFlash.playState("jump");
		this.speed.y = -350;
		this.acceleration.y = Player.GRAVITY;
		this.canJump = false;
	}

	public run(): void {
		this.catFlash.playState("run");
	}

	public idle(): void {
		this.catFlash.playState("idle");
	}

	public getDamage(): void {
		this.life -= 1;
	}

	public getHitbox(): Rectangle {
		return this.hitbox.getBounds();
	}
}
