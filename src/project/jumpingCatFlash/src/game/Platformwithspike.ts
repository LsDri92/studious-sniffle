import { Container } from "pixi.js";
import { Platform } from "./Platforms";
import { Spikes } from "./Spikes";

export class Platwithspike extends Container {
	private platform: Platform;
	private spikes: Spikes;
	private spikes1: Spikes;
	private spikes2: Spikes;

	constructor() {
		super();

		this.platform = new Platform();

		this.spikes = new Spikes();
		this.spikes.position.set(0, -20);
		this.spikes1 = new Spikes();
		this.spikes1.position.set(20, -20);
		this.spikes2 = new Spikes();
		this.spikes2.position.set(45, -20);

		this.addChild(this.platform);
		this.platform.addChild(this.spikes, this.spikes1, this.spikes2);
	}
}
