import { Container, Sprite, Texture, TilingSprite } from "pixi.js";

import type { IUpdateable } from "../utils/IUpdateable";

import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { MenuScene } from "./MenuScene";
import { TextScene } from "./TextScene";
import { Platform } from "../objects/Platforms";
import { Platwithspike } from "../objects/Platformwithspike";
import { Player } from "../objects/Player";
import { Spikes } from "../objects/Spikes";
import { checkColission } from "../utils/IHitbox";

export class TickerScene extends SceneBase implements IUpdateable {
	private playerCat: Player;
	private platforms: Platform[];
	private platwithspike: Platwithspike[];
	private spikes: Spikes[];
	private world: Container;
	private bground: TilingSprite;
	private floor: TilingSprite;
	private middle: Sprite;
	private middle1: Sprite;
	private checkeredFlag: Sprite;

	constructor() {
		super();

		this.world = new Container();
		this.bground = new TilingSprite(Texture.from("backgroundimg"), SceneManager.WIDTH * 2, SceneManager.HEIGHT);
		this.floor = new TilingSprite(Texture.from("floor"), SceneManager.WIDTH * 6);
		this.floor.y = 705;

		this.middle = new Sprite(Texture.from("middle"));
		this.middle.position.set(-330, 450);
		this.middle1 = new Sprite(Texture.from("middle"));
		this.middle1.position.set(-630, 450);

		this.addChild(this.bground);

		const house: Sprite = new Sprite(Texture.from("house"));
		house.position.y = 275;
		house.scale.set(0.8);
		this.world.addChild(house);

		const tree: Sprite = new Sprite(Texture.from("tree"));
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

		let plat = new Platform();
		plat.x = 1250;
		plat.y = 650;
		this.world.addChild(plat);
		this.platforms.push(plat);

		plat = new Platform();
		plat.x = 1450;
		plat.y = 520;
		this.world.addChild(plat);
		this.platforms.push(plat);

		plat = new Platform();
		plat.x = 2150;
		plat.y = 600;
		this.world.addChild(plat);
		this.platforms.push(plat);

		// platform with spikes

		this.platwithspike = [];
		const plats = new Platwithspike();
		plats.position.set(2450, 620);
		this.world.addChild(plats);
		this.platwithspike.push(plats);
		// spikes

		this.spikes = [];

		let spike = new Spikes();
		spike.x = 1600;
		spike.y = 685;
		this.world.addChild(spike);
		this.spikes.push(spike);

		spike = new Spikes();
		spike.x = 1630;
		spike.y = 685;
		this.world.addChild(spike);
		this.spikes.push(spike);

		spike = new Spikes();
		spike.x = 1660;
		spike.y = 685;
		this.world.addChild(spike);
		this.spikes.push(spike);

		spike = new Spikes();
		spike.x = 1690;
		spike.y = 685;
		this.world.addChild(spike);
		this.spikes.push(spike);

		spike = new Spikes();
		spike.x = 1850;
		spike.y = 600;
		this.world.addChild(spike);
		this.spikes.push(spike);

		spike = new Spikes();
		spike.x = 1875;
		spike.y = 600;
		this.world.addChild(spike);
		this.spikes.push(spike);

		spike = new Spikes();
		spike.x = 1890;
		spike.y = 600;
		this.world.addChild(spike);
		this.spikes.push(spike);

		plat = new Platform();
		plat.x = 1850;
		plat.y = 620;
		this.world.addChild(plat);
		this.platforms.push(plat);

		spike = new Spikes();
		spike.x = 2420;
		spike.y = 685;
		this.world.addChild(spike);
		this.spikes.push(spike);

		spike = new Spikes();
		spike.x = 2450;
		spike.y = 685;
		this.world.addChild(spike);
		this.spikes.push(spike);

		spike = new Spikes();
		spike.x = 2470;
		spike.y = 685;
		this.world.addChild(spike);
		this.spikes.push(spike);

		this.checkeredFlag = new Sprite(Texture.from("chekflag"));

		this.checkeredFlag.scale.set(3);
		this.checkeredFlag.position.set(2000, 550);

		this.world.addChild(this.floor);
		this.addChild(this.checkeredFlag);
		this.world.addChild(this.playerCat);
		this.addChild(this.world);
	}

	public update(_frame: number, deltaMs: number): void {
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
				} else {
					if (this.playerCat.y < platform.y) {
						this.playerCat.y -= overlap.height;
						this.playerCat.speed.y = 0;
						this.playerCat.canJump = true;
					} else if (this.playerCat.y > platform.y) {
						this.playerCat.y += overlap.height;
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
					SceneManager.changeScene(new TextScene());
				}

				if (this.playerCat.x > 2700) {
					SceneManager.changeScene(new MenuScene());
				}
			}

			// limit vertical
			if (this.playerCat.y > 690) {
				this.playerCat.canJump = true;
				this.playerCat.y = 690;
			}

			if (this.playerCat.x > SceneManager.WIDTH / 2) {
				this.world.x = -this.playerCat.x * this.worldTransform.d + SceneManager.WIDTH / 2;
			}

			this.bground.tilePosition.x = this.world.x * 0.2;

			if (this.playerCat.x < 0) {
				this.playerCat.x = 0;
			}
		}
	}
}
