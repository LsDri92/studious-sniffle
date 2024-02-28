import { Container } from "@pixi/display";
import { BaseTexture } from "@pixi/core";
import type { EntitiesCreator } from "../objects/EntitiesCreator";
import { Scenario } from "../utils/TileMap";

export class LevelCreator extends Container {
	public static readonly BUNDLES = ["img"];

	public levelEntities: EntitiesCreator;

	public readonly mapa: Scenario;

	constructor(jsonData: any) {
		super();
		this.mapa = jsonData;
		const mapa = new Scenario(this.mapa);
		mapa.makeScenario(BaseTexture.from("initialLoad/preloader/Terrain.png"), 16);

		this.addChild(this.levelEntities, mapa);
	}
}
