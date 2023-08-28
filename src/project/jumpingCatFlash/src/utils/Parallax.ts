import { Texture, TilingSprite } from "pixi.js";
import { Container } from "pixi.js";
import { Keyboard } from "../../../../engine/input/Keyboard";
import { Key } from "../../../../engine/input/Key";

export class Parallax extends Container {
	private layers: Array<TilingSprite> = [];
	private parallaxLayerSpeed: number;
	/** note: the name of layerSprite has to be "layer" as it goes.
	 *  the ".png" was add by code.
	 * every ".png" MUST to be added as an Assets in assets.jsonc */
	constructor(numberOfLayers: number, layerSprite: string, parallaxSpeed: number) {
		super();

		this.parallaxLayerSpeed = parallaxSpeed;

		for (let i = 0; i < numberOfLayers; i++) {
			const texture = Texture.from(`${layerSprite + i.toString()}`);
			const layer = new TilingSprite(texture, texture.width, texture.height);
			layer.clampMargin = -0.5;

			this.addChild(layer);
			this.layers.push(layer);
		}
	}
	public update(): void {
		for (let i = 0; i < this.layers.length; i++) {
			if (Keyboard.shared.isDown(Key.LEFT_ARROW)) {
				this.layers[i].tilePosition.x -= this.worldTransform.d * this.parallaxLayerSpeed * i;
			}
			if (Keyboard.shared.isDown(Key.RIGHT_ARROW)) {
				this.layers[i].tilePosition.x += this.worldTransform.d * this.parallaxLayerSpeed * i;
			}
		}
	}
}
