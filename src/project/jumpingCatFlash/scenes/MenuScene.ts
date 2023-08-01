import { Sprite, Texture, Text, TextStyle, AnimatedSprite, Graphics } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { SceneBase } from "../utils/SceneBase";

import { TickerScene } from "./TickerScene";
import { Manager } from "../../..";

export class MenuScene extends SceneBase {
	public update(): void {
		if (Keyboard.state.get("KeyS")) {
			Manager.changeScene(TickerScene);
		}
	}

	private backmenu: Sprite;
	private welcomeTo: Text;
	private idleCat: AnimatedSprite;
	private cartelNew: Graphics;

	constructor() {
		super();

		this.backmenu = new Sprite(Texture.from("backmenu"));
		this.backmenu.width = SceneManager.WIDTH;
		this.backmenu.height = SceneManager.HEIGHT;
		this.addChild(this.backmenu);

		const tStyle = new TextStyle({
			fontSize: 150,
			fill: 0x550055,
			dropShadow: true,
			dropShadowColor: 0xff0000,
		});

		this.welcomeTo = new Text("Jumping Cat Flash", tStyle);
		this.addChild(this.welcomeTo);

		this.idleCat = new AnimatedSprite([Texture.from("standcat1"), Texture.from("standcat2"), Texture.from("standcat3"), Texture.from("standcat4")], true);

		this.idleCat.play();
		this.idleCat.anchor.set(0.5, 0.5);
		this.idleCat.animationSpeed = 0.1;
		this.idleCat.scale.x = 4;
		this.idleCat.scale.y = 4;
		this.idleCat.x = this.welcomeTo.x + 250;
		this.idleCat.y = this.welcomeTo.y + 550;
		this.addChild(this.idleCat);

		this.cartelNew = new Graphics();
		this.cartelNew.beginFill(0xff0000, 0.4);
		this.cartelNew.drawRect(600, 400, 300, 100);

		this.cartelNew.endFill();
		this.addChild(this.cartelNew);

		const tStyle2 = new TextStyle({
			fontSize: 35,
			fill: 0x000000,
		});

		const text = new Text("Press S to Start", tStyle2);
		text.x = this.cartelNew.x + 615;
		text.y = this.cartelNew.y + 425;

		this.addChild(text);
	}
}
