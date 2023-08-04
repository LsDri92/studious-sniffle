import { Timer } from "../../../../engine/tweens/Timer";
import { PopupBase } from "./PopupBase";

export class LevelPopup extends PopupBase {
	private levelnumber: number;

	constructor(level: number) {
		super();
		this.levelnumber = level;
		this.title.text = `LEVEL ${this.levelnumber}`;
		this.title.interactive = true;
		new Timer()
			.duration(1500)
			.start()
			.onComplete(() => {
				this.animateAndClose(() => {});
			});
	}
}
