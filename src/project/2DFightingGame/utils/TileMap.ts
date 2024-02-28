import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import type { BaseTexture } from "@pixi/core";
import { GetTileTexture } from "../../../engine/utils/Tileset";

export class Scenario extends Container {
	public identifier: string;
	public iid: string;
	public worldX: number;
	public worldY: number;
	public bgColor: string;
	public layerInstances: any;
	private jsonData: any;
	constructor(jsonData: any) {
		super();

		this.identifier = jsonData.identifier;
		this.iid = jsonData.iid;
		this.worldX = jsonData.worldX;
		this.worldY = jsonData.worldY;
		this.bgColor = jsonData.bgColor;
		this.layerInstances = jsonData.layerInstances[0];
		this.jsonData = jsonData;
	}

	public makeScenario(baseTexture: BaseTexture, tilesize: number): void {
		const tileSize = tilesize;
		for (let l = 0; l < this.jsonData.layerInstances.length; l++) {
			for (let i = 0; i < this.jsonData.layerInstances[l].autoLayerTiles.length; i++) {
				const tileTexture = GetTileTexture(
					baseTexture,
					this.jsonData.layerInstances[l].autoLayerTiles[i].src[0],
					this.jsonData.layerInstances[l].autoLayerTiles[i].src[1],
					tileSize,
					tileSize
				);

				const tile = Sprite.from(tileTexture);
				tile.x = this.jsonData.layerInstances[l].autoLayerTiles[i].px[0];
				tile.y = this.jsonData.layerInstances[l].autoLayerTiles[i].px[1];
				this.addChild(tile);
			}
		}
	}
}
