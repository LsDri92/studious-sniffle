import { AnimatedSprite, Texture } from "pixi.js";
import { Container } from "pixi.js";
import { Sprite } from "pixi.js";
import { PixiScene } from "../../../../engine/scenemanager/scenes/PixiScene";
import { ScaleHelper } from "../../../../engine/utils/ScaleHelper";
import { Button } from "../../../../engine/ui/button/Button";
import { Manager } from "../../../..";
import { GameScene } from "./GameScene";
import { Tween } from "tweedle.js";
import Random from "../../../../engine/random/Random";
// import { GlowFilter } from "@pixi/filter-glow";
import { SoundButtons } from "../utils/SoundButtons";
import { FadeColorTransition } from "../../../../engine/scenemanager/transitions/FadeColorTransition";

export class MainMenuScene extends PixiScene {
	public static readonly BUNDLES = ["package-1", "ui-placeholder-demo", "music"];
	private menuContainer: Container;
	private background: Sprite;
	private title: Sprite;
	private buttonPlay: Button;
	private catStand: AnimatedSprite;

	constructor() {
		super();

		this.menuContainer = new Container();
		this.addChild(this.menuContainer);
		this.background = Sprite.from("package-1/jumpingCatFlash/menuback.png");

		this.title = Sprite.from("package-1/jumpingCatFlash/titleCatGame.png");
		this.title.anchor.set(0.6);
		this.title.scale.set(1.2);
		this.catStand = new AnimatedSprite([
			// Texture.from("package-1/jumpingCatFlash/standcat/standcat1.png"),
			Texture.from("package-1/jumpingCatFlash/standcat/standcat2.png"),
			Texture.from("package-1/jumpingCatFlash/standcat/standcat3.png"),
			Texture.from("package-1/jumpingCatFlash/standcat/standcat4.png"),
		]);
		this.catStand.play();
		this.catStand.animationSpeed = 0.2;
		this.catStand.scale.set(2);

		// const glowFilter = new GlowFilter({ color: 0xff0000 });

		this.buttonPlay = new Button({
			clickOnce: true,
			defaultState: {
				texture: "ui-placeholder-demo/btnPlay.png",
			},
			highlightState: {
				scale: 0.9,
			},
			downState: {
				scale: 0.8,
			},
			onClick: () => {
				this.startGame();
			},
		});
		// this.buttonPlay.filters = [glowFilter];
		this.buttonPlay.scale.set(0.5);
		this.buttonPlay.pivot.set(this.buttonPlay.width / 2, 0);
		this.buttonPlay.position.set(this.background.width / 2, this.background.height * 0.55);
		this.title.position.set(this.buttonPlay.position.x, 75);
		this.catStand.position.set(50, 250);

		const scalename: Tween<any> = new Tween(this.title)
			.to({ tint: Random.shared.random(0, 0xffffff), scale: { x: Random.shared.random(0.5, 1), y: Random.shared.random(0.5, 1) } }, Random.shared.randomInt(2000, 4000))
			.yoyo(true)
			.repeat(Infinity)
			.onRepeat(() =>
				scalename.to(
					{ tint: Random.shared.random(0, 0xffffff), scale: { x: Random.shared.random(0.5, 1), y: Random.shared.random(0.5, 1) } },
					Random.shared.randomInt(2000, 4000)
				)
			)
			.start();
		this.background.addChild(this.title, this.buttonPlay, this.catStand);

		this.menuContainer.addChild(this.background);
		Manager.openScene(SoundButtons);
	}

	private startGame(): void {
		Manager.changeScene(GameScene, { sceneParams: [1], transitionClass: FadeColorTransition });
	}

	public override onResize(_newW: number, _newH: number): void {
		// this.background.position.set(_newW / 2, _newH / 2);
		ScaleHelper.setScaleRelativeToScreen(this.menuContainer, _newW, _newH, 1, 1, ScaleHelper.FILL);
		// ScaleHelper.setScaleRelativeToIdeal(this.background, _newW, _newH, 1, 1, ScaleHelper.FILL);
	}
}
