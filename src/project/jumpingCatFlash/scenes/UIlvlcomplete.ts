import { NineSlicePlane, Texture, Text, Sprite, AnimatedSprite } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";

export class UIlvlcomplete extends SceneBase {
	public update(): void {}

	constructor() {
		super();

		const panel = new NineSlicePlane(Texture.from("panel"), 35, 35, 35, 35);
		this.addChild(panel);
		panel.width = 350;
		panel.height = 400;
		panel.position.x = 470;
		panel.position.y = 80;

		const finishText: Text = new Text("Level complete", { fontSize: 20, fill: 0x000000, fontFamily: "Tahoma" });
		this.addChild(finishText);
		finishText.position.x = 485;
		finishText.position.y = 82;

		const completeCat: AnimatedSprite = new AnimatedSprite(
			[Texture.from("lvlcompletecat1"), Texture.from("lvlcompletecat2"), Texture.from("lvlcompletecat3"), Texture.from("lvlcompletecat4")],
			true
		);
		completeCat.play();
		completeCat.animationSpeed = 0.09;
		completeCat.scale.set(4);
		completeCat.position.x = 230;
		completeCat.position.y = -10;

		panel.addChild(completeCat);

		const time: Sprite = new Sprite(Texture.from("textbox"));

		time.width = 150;
		time.height = 50;
		time.position.x = 100;
		time.position.y = 100;

		panel.addChild(time);

		const timeText: Text = new Text("Time:", { fontSize: 22, fill: 0x000000, fontFamily: "Calibri" });
		panel.addChild(timeText);
		timeText.position.x = 140;
		timeText.position.y = 103;

		const points: Sprite = new Sprite(Texture.from("textbox"));

		points.width = 150;
		points.height = 50;
		points.position.x = 100;
		points.position.y = 200;

		panel.addChild(points);

		const pointsText: Text = new Text("Points:", { fontSize: 22, fill: 0x000000, fontFamily: "Calibri" });
		panel.addChild(pointsText);
		pointsText.position.x = 140;
		pointsText.position.y = 203;

		const completeBar: Sprite = new Sprite(Texture.from("completebar"));

		completeBar.width = 250;
		completeBar.height = 30;
		completeBar.position.x = 50;
		completeBar.position.y = 280;

		panel.addChild(completeBar);

		const progressText: Text = new Text("Progress", { fontSize: 17, fill: 0x404040, fontFamily: "Segoe UI Historic" });
		panel.addChild(progressText);
		progressText.position.x = 135;
		progressText.position.y = 285;

		const nextButton: Sprite = new Sprite(Texture.from("greenbutton"));
		nextButton.scale.set(0.2);
		nextButton.position.x = 280;
		nextButton.position.y = 340;

		panel.addChild(nextButton);

		const exitButton: Sprite = new Sprite(Texture.from("exitbutton"));
		exitButton.scale.set(0.2);
		exitButton.position.x = 25;
		exitButton.position.y = 340;

		panel.addChild(exitButton);
	}
}
