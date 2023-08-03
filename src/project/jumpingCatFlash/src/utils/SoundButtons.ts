import { Tween } from "tweedle.js";
import { DataManager } from "../../../../engine/datamanager/DataManager";
import { SoundLib } from "../../../../engine/sound/SoundLib";
import { ToggleCheck } from "../../../../engine/ui/toggle/ToggleCheck";
import { Container } from "pixi.js";
import { PixiScene } from "../../../../engine/scenemanager/scenes/PixiScene";
import { ScaleHelper } from "../../../../engine/utils/ScaleHelper";
import { GlowFilter } from "@pixi/filter-glow";
import { Timer } from "../../../../engine/tweens/Timer";

export class SoundButtons extends PixiScene {
	public static readonly BUNDLES = ["ui-placeholder-demo", "music"];
	public scaleFactor = 0.4;
	private topRightContainer = new Container();
	public soundBtn: ToggleCheck;

	constructor() {
		super();
		new Timer()
			.duration(200)
			.start()
			.onComplete(() => {
				SoundLib.playMusic("jumpingCat");
			});

		this.soundBtn = new ToggleCheck({
			buttonTexture: "ui-placeholder-demo/soundOff.png",
			checkTexture: "ui-placeholder-demo/soundOn.png",
			onToggleOn() {
				DataManager.setValue("mutemusic", true);
				DataManager.save();
				SoundLib.muteMusic = false;
				SoundLib.muteSound = false;
			},
			onToggleOff: () => {
				DataManager.setValue("mutemusic", false);
				DataManager.save();
				SoundLib.muteMusic = true;
				SoundLib.muteSound = true;
			},
			startingValue: DataManager.getValue("mutemusic"),
		});

		this.soundBtn.x = this.soundBtn.x - this.soundBtn.width * 2;
		this.soundBtn.y = this.soundBtn.y + this.soundBtn.height;

		this.topRightContainer.addChild(this.soundBtn);

		const glowFilter = new GlowFilter({ color: 0xff0000 });

		this.soundBtn.filters = [glowFilter];

		new Tween(glowFilter).to({ alpha: 0.5 }, 900).yoyo(true).repeat(Infinity).start();
		this.soundBtn.interactive = true;

		this.topRightContainer.y = -10;
		this.addChild(this.topRightContainer);
	}

	public override onResize(_newW: number, _newH: number): void {
		// Values match the ones on UI.ts so they dont overlap
		ScaleHelper.setScaleRelativeToScreen(this.topRightContainer, _newW, _newH, 0.35 * this.scaleFactor, 0.16 * this.scaleFactor, Math.min);
		this.topRightContainer.x = _newW;
		// this.topRightContainer.y = 0;
	}
}
