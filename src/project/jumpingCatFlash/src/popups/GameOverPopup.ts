import { Manager } from "../../../..";
import { FadeColorTransition } from "../../../../engine/scenemanager/transitions/FadeColorTransition";
import { Timer } from "../../../../engine/tweens/Timer";
import { Button } from "../../../../engine/ui/button/Button";
import { MainMenuScene } from "../Scenes/MainMenuScene";
import { PopupBase } from "./PopupBase";

export class GameOverPopup extends PopupBase {
	private back: Button;
	constructor() {
		super();
		this.title.text = "GAME OVER";
		this.back = new Button({
			defaultState: {
				texture: "package-1/jumpingCatFlash/UIpause/forward.png",
			},
			clickOnce: true,
			onClick: () => {
				this.animateAndClose(() => {});
				new Timer()
					.duration(510)
					.start()
					.onComplete(() => {
						this.closeHandler();
						Manager.changeScene(MainMenuScene, { transitionClass: FadeColorTransition });
					});
			},
		});
		this.back.position.set(this.title.x, this.title.y + 30);
		this.tweenContainer.addChild(this.back);
	}
}
