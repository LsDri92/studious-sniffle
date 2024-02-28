import { Container } from "@pixi/display";

export class EntitiesCreator extends Container {
	constructor(levelData: any) {
		super();

		for (let i = 1; i < levelData.layerInstances.length; i++) {
			for (let j = 0; j < levelData.layerInstances[i].entityInstances.length; j++) {
				// const data = [
				// 	levelData.layerInstances[i].entityInstances[j].__identifier,
				// 	undefined,
				// 	levelData.layerInstances[i].entityInstances[j].iid,
				// 	levelData.layerInstances[i].entityInstances[j].px[0],
				// 	levelData.layerInstances[i].entityInstances[j].px[1],
				// 	levelData.layerInstances[i].entityInstances[j].width,
				// 	levelData.layerInstances[i].entityInstances[j].height,
				// 	levelData.layerInstances[i].entityInstances[j].__pivot[0],
				// 	levelData.layerInstances[i].entityInstances[j].__pivot[1],
				// 	levelData.layerInstances[i].entityInstances[j].__tile,
				// 	levelData.layerInstances[i].entityInstances[j].fieldInstances,
				// ];
			}
		}
		console.log(levelData);
	}
}
