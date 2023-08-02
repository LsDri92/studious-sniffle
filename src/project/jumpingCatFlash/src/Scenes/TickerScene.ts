import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { checkColission } from "../game/IHitbox";
import { Platform } from "../game/Platforms";
import { Player } from "../game/Player";
import { Spikes } from "../game/Spikes";
import { PixiScene } from "../../../../engine/scenemanager/scenes/PixiScene";
import { ScaleHelper } from "../../../../engine/utils/ScaleHelper";

export class TickerScene extends PixiScene {
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
		tree.position.x = 900;
		tree.position.y = 420;
		this.world.addChild(tree);

		this.world.addChild(this.middle);
		this.world.addChild(this.middle1);

		// Player

		this.playerCat = new Player();
		this.playerCat.position.set(150, 705);

		// platform

		this.platforms = [];

		const platPosX = [250, 450, 150, 850];
		const platPosY = [650, 520, 600, 620];

		for (let i = 0; i < 4; i++) {
			const platform = new Platform();
			platform.position.set(platPosX[i], platPosY[i]);
			this.platforms.push(platform);
			this.world.addChild(platform);
		}

		this.spikes = [];

		const spikePosX = [600, 630, 560, 690];
		const spikePosY = [685, 685, 685, 685];

		for (let i = 0; i < 4; i++) {
			const spike = new Spikes();
			spike.position.set(spikePosX[i], spikePosY[i]);
			this.spikes.push(spike);
			this.world.addChild(spike);
		}

		this.world.addChild(this.floor);

		this.world.addChild(this.playerCat);
		this.addChild(this.world);
	}
	public override update(deltaMs: number): void {
		this.playerCat.update(deltaMs); // update animation

		for (const platform of this.platforms) {
			const overlap = checkColission(this.playerCat, platform);
			if (overlap != null) {
				if (overlap.width < overlap.height) {
					if (this.playerCat.x > platform.x) {
						this.playerCat.x += overlap.width;
					} else if (this.playerCat.x < platform.x) {
						this.playerCat.x -= overlap.width;
					}
				}

				if (this.playerCat.y < platform.y) {
					this.playerCat.y -= overlap.height;
					if (!this.playerCat.canJump) {
						this.playerCat.speed.y = 0;
						this.playerCat.canJump = true;
					}
				} else if (this.playerCat.y > platform.y) {
					this.playerCat.y += overlap.height;
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
	}

	public override onResize(_newW: number, _newH: number): void {
		ScaleHelper.setScaleRelativeToScreen(this.world, _newW, _newH, 1, 1, ScaleHelper.FILL);
		// ScaleHelper.setScaleRelativeToScreen(this.bground, _newW, _newH, 1, 1, ScaleHelper.FILL);
	}
}
