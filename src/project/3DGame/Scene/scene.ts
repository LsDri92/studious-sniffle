// import type { Sprite3D } from "pixi3d/pixi7";
import { Container3D, Mesh3D } from "pixi3d/pixi7";
import { PixiScene } from "../../../engine/scenemanager/scenes/PixiScene";
import { Keyboard } from "../../../engine/input/Keyboard";
import { Key } from "../../../engine/input/Key";
import { cameraControl } from "../../..";
import { Sprite, Texture } from "pixi.js";
import { ScaleHelper } from "../../../engine/utils/ScaleHelper";

export class Scene3d extends PixiScene {
	public static readonly BUNDLES = ["package-1"];
	private world: Container3D = new Container3D();
	private background: Sprite;
	// private player: Sprite3D;

	constructor() {
		super();
		this.addChild(this.world);
		this.background = new Sprite(Texture.from("package-1/jumpingCatFlash/back.png"));
		ScaleHelper.setScaleRelativeToScreen(this.background, ScaleHelper.IDEAL_WIDTH, ScaleHelper.IDEAL_HEIGHT, 1, 1, ScaleHelper.FILL);
		this.world.addChild(this.background);

		const sphere0 = Mesh3D.createSphere();
		sphere0.scale.set(2, 2, 1);
		sphere0.position.set(0, 0, 0);

		const sphere50 = Mesh3D.createSphere();
		sphere50.scale.set(1, 1, 1);
		sphere50.position.set(0, 0, -50);

		const sphere100 = Mesh3D.createSphere();
		sphere100.scale.set(1, 1, 1);
		sphere100.position.set(0, 0, -100);

		const sphere150 = Mesh3D.createSphere();
		sphere150.scale.set(1, 1, 1);
		sphere150.position.set(0, 0, -150);

		this.world.addChild(sphere0, sphere50, sphere100, sphere150);
	}

	public override update(dt: number): void {
		dt;
		if (Keyboard.shared.isDown(Key.RIGHT_ARROW)) {
			cameraControl.target.z += 0.4;
		}
		if (Keyboard.shared.isDown(Key.LEFT_ARROW)) {
			cameraControl.target.z -= 0.4;
		}

		if (Keyboard.shared.isDown(Key.UP_ARROW)) {
		}
	}
}
