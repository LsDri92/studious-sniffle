import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { checkColission } from "../game/IHitbox";
import { Platform } from "../game/Platforms";
import { Player } from "../game/Player";
import { Spikes } from "../game/Spikes";
import { PixiScene } from "../../../../engine/scenemanager/scenes/PixiScene";
import { ScaleHelper } from "../../../../engine/utils/ScaleHelper";
import { Response } from "sat";
import { Hit } from "../../../../engine/collision/Hit";
import { Keyboard } from "../../../../engine/input/Keyboard";
import { Key } from "../../../../engine/input/Key";
import { Timer } from "../../../../engine/tweens/Timer";

export class GameScene extends PixiScene {
	public static readonly BUNDLES = ["package-1"];
	private playerCat: Player;
	private platforms: Platform[];
	private spikes: Spikes[];
	private world: Container;
	private bground: Sprite;
	private floor: TilingSprite;
	private middle: Sprite;
	private middle1: Sprite;

	constructor() {
		super();

		this.world = new Container();
		this.bground = new Sprite(Texture.from("package-1/jumpingCatFlash/back.png"));
		this.bground.width = ScaleHelper.IDEAL_WIDTH;
		// this.bground.height = ScaleHelper.IDEAL_HEIGHT;
		this.floor = new TilingSprite(Texture.from("package-1/jumpingCatFlash/tileset.png"), ScaleHelper.IDEAL_WIDTH);
		this.floor.y = 705;

		this.middle = new Sprite(Texture.from("package-1/jumpingCatFlash/middle.png"));
		this.middle.position.set(-330, 450);
		this.middle1 = new Sprite(Texture.from("package-1/jumpingCatFlash/middle.png"));
		this.middle1.position.set(-630, 450);

		this.world.addChild(this.bground);

		const house: Sprite = new Sprite(Texture.from("package-1/jumpingCatFlash/house.png"));
		house.position.y = 275;
		house.scale.set(0.8);
		this.world.addChild(house);

		const tree: Sprite = new Sprite(Texture.from("package-1/jumpingCatFlash/tree.png"));
		tree.position.x = 1050;
		tree.position.y = 420;
		this.world.addChild(tree, this.middle, this.middle1);

		// Player

		this.playerCat = new Player();
		this.playerCat.position.set(150, 705);

		this.levelOne();
		this.addChild(this.world);
	}
	public override update(deltaMs: number): void {
		this.playerCat.update(deltaMs); // update animation

		if (Keyboard.shared.isDown(Key.RIGHT_ARROW) && this.playerCat.isMoving) {
			this.playerCat.run();
			this.playerCat.isMoving = false;
			this.playerCat.speed.x = Player.MOVE_PLAYER;
			this.playerCat.scale.x = 1;
			this.playerCat.acceleration.y = Player.GRAVITY;
		}
		if (Keyboard.shared.isDown(Key.LEFT_ARROW) && this.playerCat.isMoving) {
			this.playerCat.run();
			this.playerCat.isMoving = false;
			this.playerCat.speed.x = -Player.MOVE_PLAYER;
			this.playerCat.scale.x = -1;
			this.playerCat.acceleration.y = Player.GRAVITY;
		}

		if ((Keyboard.shared.justReleased(Key.LEFT_ARROW) && !this.playerCat.isMoving) || (Keyboard.shared.justReleased(Key.RIGHT_ARROW) && !this.playerCat.isMoving)) {
			this.playerCat.speed.x = 0;
			this.playerCat.acceleration.y = Player.GRAVITY;
			this.playerCat.isMoving = true;
			this.playerCat.idle();
		}

		if (Keyboard.shared.isDown(Key.UP_ARROW) && this.playerCat.canJump) {
			this.playerCat.canJump = false;
			this.playerCat.jump();
		}

		const result: Response = new Response(); // OPTIONAL

		for (let i = 0; i < this.platforms.length; i++) {
			const collisionHappened = Hit.test(this.playerCat.hitbox, this.platforms[i].hitbox, result);
			if (collisionHappened) {
				if (result.overlapN.x) {
					if (this.playerCat.x > this.platforms[i].x) {
						this.playerCat.x += result.overlap;
					}

					if (this.playerCat.x < this.platforms[i].x) {
						this.playerCat.x -= result.overlap;
					}
				}

				if (result.overlapN.y) {
					if (this.playerCat.y > this.platforms[i].y) {
						this.playerCat.y += result.overlap;
					}
					if (this.playerCat.y < this.platforms[i].y) {
						this.playerCat.y -= result.overlap;
						this.playerCat.acceleration.y = 0;
						this.playerCat.speed.y = 0;
						new Timer()
							.duration(200)
							.start()
							.onComplete(() => {
								this.playerCat.canJump = true;
							});
					}
				}
			}
		}

		for (const spike of this.spikes) {
			const overlap = checkColission(this.playerCat, spike);

			if (overlap != null) {
				if (overlap.width < overlap.height) {
					if (this.playerCat.x > spike.x) {
						this.playerCat.x += overlap.width;
					} else if (this.playerCat.x < spike.x) {
						this.playerCat.x -= overlap.width;
					}
				} else {
					if (this.playerCat.y < spike.y) {
						this.playerCat.y -= overlap.height;
						this.playerCat.speed.y = 0;

						this.playerCat.canJump = true;
						this.playerCat.destroy(true);
					} else if (this.playerCat.y > spike.y) {
						this.playerCat.y += overlap.height;
					}
				}
			}

			if (this.playerCat.destroyed) {
			}
		}

		// limit vertical
		if (this.playerCat.y > 690) {
			this.playerCat.canJump = true;
			this.playerCat.y = 690;
		}

		if (this.playerCat.x < 0) {
			this.playerCat.x = 0;
		}
	}

	private levelOne(): void {
		// platform

		this.platforms = [];

		const platPosX = [400, 500, 400, 600, 350, 700, 1100];
		const platPosY = [660, 570, 470, 420, 330, 280, 310];

		for (let i = 0; i < platPosX.length; i++) {
			const platform = new Platform();
			platform.position.set(platPosX[i], platPosY[i]);
			this.platforms.push(platform);
			this.world.addChild(platform);
		}

		this.spikes = [];

		const spikePosX = [600, 630, 560, 690, 725, 755, 785, 885, 900, 950, 1000, 1100, 1150, 1200];
		const spikePosY = [685, 685, 685, 685, 685, 685, 685, 685, 685, 685, 685, 685, 685, 685];

		for (let i = 0; i < spikePosX.length; i++) {
			const spike = new Spikes();
			spike.position.set(spikePosX[i], spikePosY[i]);
			this.spikes.push(spike);
			this.world.addChild(spike);
		}

		this.world.addChild(this.floor, this.playerCat);
	}

	public override onResize(_newW: number, _newH: number): void {
		ScaleHelper.setScaleRelativeToScreen(this.world, _newW, _newH, 1, 1, ScaleHelper.FILL);
		// ScaleHelper.setScaleRelativeToScreen(this.bground, _newW, _newH, 1, 1, ScaleHelper.FILL);
	}
}
