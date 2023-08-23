/* eslint-disable @typescript-eslint/naming-convention */

import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { checkColission } from "../utils/IHitbox";
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
import { Manager, cameraControl } from "../../../..";
import { LevelPopup } from "../popups/LevelPopup";
import { GameOverPopup } from "../popups/GameOverPopup";
import { FadeColorTransition } from "../../../../engine/scenemanager/transitions/FadeColorTransition";
import { Tween } from "tweedle.js";

export class GameScene extends PixiScene {
	private playerCat: Player;
	private platforms: Platform[];
	private spikes: Spikes[];
	private world: Container;
	private bground: Sprite;
	private floor: TilingSprite;
	private middle: Sprite;
	private middle1: Sprite;
	public isAlive: boolean = true;
	private tree: Sprite;
	private level: number;
	private platformGroup: 1 | 2 | 3 = 1;

	constructor(level: number) {
		super();
		this.level = level;
		this.level = 3;
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

		this.tree = Sprite.from(Texture.from("package-1/jumpingCatFlash/tree.png"));
		this.tree.position.x = 1050;
		this.tree.position.y = 420;
		this.world.addChild(this.tree, this.middle, this.middle1);

		// Player

		this.playerCat = new Player();
		this.playerCat.position.set(150, 705);
		if (this.level == 1) {
			this.levelOne();
		}

		switch (this.level) {
			case 1:
				this.levelOne();
				break;
			case 2:
				this.levelTwo();
				break;
			case 3:
				this.levelThree();
				break;

			default:
				break;
		}
		this.addChild(this.world);
		cameraControl.allowControl = true;
		cameraControl.distance = 1;
		cameraControl.target.x = this.world.x;
		cameraControl.target.y = this.world.y;
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

						this.playerCat.canJump = false;
						if (this.isAlive) {
							this.isAlive = false;
							this.playerCat.dead();
							Manager.openPopup(GameOverPopup);
						}
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

		// limit left
		if (this.playerCat.x < 0) {
			this.playerCat.x = 0;
		}

		switch (this.level) {
			case 1:
				this.endLevel(2);
				break;
			case 2:
				this.endLevel(3);
				break;

			default:
				break;
		}
	}

	private endLevel(nextLevel: number): void {
		// limit right
		if (this.playerCat.x > this.tree.position.x + this.tree.width * 1.2 && !this.playerCat.isComplete) {
			this.playerCat.isComplete = true;
			this.playerCat.isMoving = false;
			this.playerCat.speed.x = 0;
			this.playerCat.scale.x = 1;

			new Timer()
				.duration(1200)
				.start()
				.onComplete(() => {
					this.playerCat.run();
					this.playerCat.speed.x = Player.MOVE_PLAYER;
					new Timer()
						.duration(1500)
						.start()
						.onComplete(() => {
							Manager.changeScene(GameScene, { sceneParams: [nextLevel], transitionClass: FadeColorTransition });
						});
				});
		}
	}

	private levelOne(): void {
		// platform

		Manager.openPopup(LevelPopup, [this.level]);
		this.platforms = [];

		const platPosX = [400, 500, 400, 600, 350, 700, 1100, 1180, 1300];
		const platPosY = [660, 570, 470, 420, 330, 280, 310, 450, 600];

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

	private levelTwo(): void {
		// platform

		Manager.openPopup(LevelPopup, [this.level]);
		this.platforms = [];

		const platPosX = [400, 500, 400, 600, 350, 700, 1100, 1180, 1300];
		const platPosY = [660, 570, 470, 420, 330, 280, 310, 450, 600];

		for (let i = 0; i < platPosX.length; i++) {
			const platform = new Platform();
			platform.position.set(platPosX[i], platPosY[i]);
			this.platforms.push(platform);
			this.world.addChild(platform);
		}

		for (let i = 0; i < this.platforms.length; i += 2) {
			new Tween(this.platforms[i])
				.from({ alpha: 1 })
				.to({ alpha: 0 }, 4200)
				.yoyo(true)
				.repeat(Infinity)
				.start()
				.onRepeat(() => {
					if (this.platforms[i].alpha == 1) {
						this.platforms[i].visible = true;
						this.platforms[i].addChild(this.platforms[i].hitbox);
					} else if (this.platforms[i].alpha == 0) {
						this.platforms[i].visible = false;
						this.platforms[i].removeChild(this.platforms[i].hitbox);
					}
				});
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

	private platforms1: Array<any> = [];
	private platforms2: Array<any> = [];
	private platforms3: Array<any> = [];
	private levelThree(): void {
		// platform

		Manager.openPopup(LevelPopup, [this.level]);

		const platPosX1 = [300, 400, 500, 600, 350, 800, 1000, 1180, 1300];
		const platPosY1 = [760, 670, 570, 520, 530, 580, 210, 350, 600];

		const platPosX2 = [400, 550, 400, 450, 550, 650, 1200, 1100, 1250];
		const platPosY2 = [660, 570, 470, 420, 330, 280, 310, 450, 600];

		const platPosX3 = [500, 600, 300, 500, 750, 700, 1100, 1180, 1300];
		const platPosY3 = [660, 570, 470, 420, 330, 280, 310, 450, 600];

		for (let i = 0; i < platPosX1.length; i++) {
			const platform = new Platform();
			platform.position.set(platPosX1[i], platPosY1[i]);
			this.platforms1.push(platform);
			this.world.addChild(platform);
		}

		for (let i = 0; i < platPosX2.length; i++) {
			const platform = new Platform();
			platform.position.set(platPosX2[i], platPosY2[i]);
			this.platforms2.push(platform);
			this.world.addChild(platform);
		}

		for (let i = 0; i < platPosX3.length; i++) {
			const platform = new Platform();
			platform.position.set(platPosX3[i], platPosY3[i]);
			this.platforms3.push(platform);
			this.world.addChild(platform);
		}
		this.platforms = this.platforms1.concat(this.platforms2, this.platforms3);

		const f: Function = (): void => {
			switch (this.platformGroup) {
				case 1:
					this.platforms1.forEach((plat) => {
						plat.visible = true;
					});
					this.platforms2.forEach((plat) => {
						plat.visible = false;
					});
					this.platforms3.forEach((plat) => {
						plat.visible = false;
					});
					break;
				case 2:
					this.platforms1.forEach((plat) => {
						plat.visible = false;
					});
					this.platforms2.forEach((plat) => {
						plat.visible = true;
					});
					this.platforms3.forEach((plat) => {
						plat.visible = false;
					});
					break;
				case 3:
					this.platforms1.forEach((plat) => {
						plat.visible = false;
					});
					this.platforms2.forEach((plat) => {
						plat.visible = false;
					});
					this.platforms3.forEach((plat) => {
						plat.visible = true;
					});
					break;

				default:
					break;
			}
		};

		f();

		new Timer()
			.duration(2500)
			.start()
			.repeat(Infinity)
			.onRepeat(() => {
				f();
				this.platformGroup += 1;
				if (this.platformGroup > 3) {
					this.platformGroup = 1;
				}
				console.log(this.platformGroup);
			});

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
	// private levelFour(): void {}
	// private levelFive(): void {}
	public override onResize(_newW: number, _newH: number): void {
		ScaleHelper.setScaleRelativeToScreen(this.world, _newW, _newH, 1, 1, ScaleHelper.FILL);
		// ScaleHelper.setScaleRelativeToScreen(this.bground, _newW, _newH, 1, 1, ScaleHelper.FILL);
	}
}
