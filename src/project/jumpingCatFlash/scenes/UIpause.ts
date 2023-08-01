import { Sprite, Text, Texture, TilingSprite } from "pixi.js";

import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { Button } from "../ui/button";
import { ToggleButton } from "../ui/toggleButton";

export class UIpause extends SceneBase {
	public sceneBase: any;
	public update(): void {}

	private bgcolour: TilingSprite;
	private returnGameButton: Button;
	private musicButtonToggle: ToggleButton;

	constructor() {
		super();

		this.bgcolour = new TilingSprite(Texture.from("backgroundimg"));
		this.bgcolour.height = SceneManager.HEIGHT;
		this.bgcolour.width = SceneManager.WIDTH;

		this.addChild(this.bgcolour);

		const cartelpause = new Sprite(Texture.from("cartelpause"));
		this.addChild(cartelpause);
		cartelpause.scale.set(0.5);
		cartelpause.height = 160;
		cartelpause.position.x = 450;
		cartelpause.position.y = 250;

		const pausewindow = new Sprite(Texture.from("pausewindow"));

		cartelpause.addChild(pausewindow);
		pausewindow.height = 50;
		pausewindow.width = 250;
		pausewindow.position.x = 260;
		pausewindow.position.y = 30;

		const pause: Text = new Text("JumpingCatFlash", { fontSize: 20, fill: 0x000000, fontFamily: "Tahoma" });
		pausewindow.addChild(pause);
		pause.height = 90;
		pause.width = 90;
		pause.position.x = 5;

		this.musicButtonToggle = new ToggleButton(Texture.from("musicOn"), Texture.from("musicOff"));
		this.musicButtonToggle.position.x = 150;
		this.musicButtonToggle.position.y = 90;
		this.musicButtonToggle.scale.set(2);
		this.musicButtonToggle.width = 150;
		this.musicButtonToggle.state = true;

		cartelpause.addChild(this.musicButtonToggle);

		this.returnGameButton = new Button(Texture.from("play"), Texture.from("playon"), Texture.from("playon"));

		this.returnGameButton.position.x = 500;
		this.returnGameButton.position.y = 90;
		this.returnGameButton.scale.set(2);
		this.returnGameButton.width = 150;

		cartelpause.addChild(this.returnGameButton);

		document.addEventListener("keydown", this.onKeyDown.bind(this));
	}

	private onKeyDown(e: KeyboardEvent): void {
		console.log("key pressed!", e.code);
	}

	// private onButtonClick(): void {
	// 	this.musicButtonToggle.emit("switch!", State);
	// 	console.log("my toggle state is", this.musicButtonToggle.state);
	// 	this.musicButtonToggle.state = !this.musicButtonToggle.state;
	// 	console.log("but I changed it to", this.musicButtonToggle.state);
	// }

	// private onMouseClick(): void {
	// 	console.log("you click me!", this);
	// }
}
