import { SceneBase } from "../utils/SceneBase";
import { Text, TextStyle } from "pixi.js";
import { SceneManager } from "../utils/SceneManager";
import { Keyboard } from "../utils/Keyboard";
import { TickerScene } from "./TickerScene";

export class TextScene extends SceneBase {
	public update(): void {
		if (Keyboard.state.get("KeyR")) {
			SceneManager.changeScene(new TickerScene());
		}
	}

	constructor() {
		super();
		const tStyle = new TextStyle({
			fontSize: 150,
			fill: 0x999999,
		});
		const t = new Text("You Lose", tStyle);

		t.x = SceneManager.WIDTH / 4;
		t.y = SceneManager.HEIGHT / 3;

		const tStyle2 = new TextStyle({
			fontSize: 50,
			fill: 0xff0000,
		});

		const t2 = new Text("Press F5 to Restart", tStyle2);
		t2.y = t.y + 200;
		t2.x = t.x + 100;

		this.addChild(t);
		this.addChild(t2);
	}
}
