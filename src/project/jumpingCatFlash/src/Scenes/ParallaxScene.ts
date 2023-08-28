import { PixiScene } from "../../../../engine/scenemanager/scenes/PixiScene";
import { ScaleHelper } from "../../../../engine/utils/ScaleHelper";
import { Parallax } from "../utils/Parallax";

export class ParallaxScene extends PixiScene {
	public static readonly BUNDLES = ["assetsParallax"];
	private parallaxBackground: Parallax;
	constructor() {
		super();

		this.parallaxBackground = new Parallax(5, "layer", 5);
		this.addChild(this.parallaxBackground);
		this.onResize(ScaleHelper.IDEAL_WIDTH, ScaleHelper.IDEAL_HEIGHT);
	}

	public override onResize(_newW: number, _newH: number): void {
		ScaleHelper.setScaleRelativeToScreen(this.parallaxBackground, _newW, _newH, 1, 1, ScaleHelper.FILL);
	}

	public override update(deltaMs: number): void {
		deltaMs;
		this.parallaxBackground.update();
	}
}
