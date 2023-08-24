/* eslint-disable prettier/prettier */
// import type { Sprite3D } from "pixi3d/pixi7";
import type {  AABB} from "pixi3d/pixi7";
import { Model } from "pixi3d/pixi7";
import { Container3D, Mesh3D } from "pixi3d/pixi7";
import { PixiScene } from "../../../engine/scenemanager/scenes/PixiScene";
import { Keyboard } from "../../../engine/input/Keyboard";
import { Key } from "../../../engine/input/Key";
import { cameraControl } from "../../..";
import { Assets, Sprite, Texture } from "pixi.js";
import { ScaleHelper } from "../../../engine/utils/ScaleHelper";

export class Scene3d extends PixiScene {
	public static readonly BUNDLES = ["package-1", "3d"];
	private world: Container3D = new Container3D();
	private background: Sprite;
	private player: Model;
	private sphere0: Mesh3D;
	private crash:boolean = false

	constructor() {
		super();
		this.addChild(this.world);
		this.background = new Sprite(Texture.from("package-1/jumpingCatFlash/back.png"));
		ScaleHelper.setScaleRelativeToScreen(this.background, ScaleHelper.IDEAL_WIDTH, ScaleHelper.IDEAL_HEIGHT, 1, 1, ScaleHelper.FILL);
		this.world.addChild(this.background);	

		this.sphere0 = Mesh3D.createSphere();
		this.sphere0.scale.set(2, 2, 1);
		this.sphere0.position.set(0, 0, 0);
		
		const containerSphere = new Container3D()
		
		

		const wall = Mesh3D.createCube()
		wall.scale.set(150,150,0)
		wall.position.set(150,150,0)

		

		const cube100 = Mesh3D.createCube();
		cube100.scale.set(1, 1, 1);
		// cube100.position.set(0, 0, -100);

		const cube150 = Mesh3D.createCube();
		cube150.scale.set(1, 1, 1);
		// cube150.position.set(0, 0, -150);


		const dragon = Assets.get("lowPolyDragon")
		this.player =  Model.from(dragon)
		this.player.position.set(50,50,50)
		this.player.scale.set(100)
		this.player.rotationQuaternion.setEulerAngles(0, 90, 0)
		containerSphere.addChild(this.player)
		// const dragonMesh = Mesh3D.createCube()
		
		for(let i=0; i <150;i++){
			const cube = Mesh3D.createCube();
		cube.scale.set(0.1, 0.1, 0.1);
		cube.position.set(0, 0, i);
		this.world.addChild(cube)
		}

		for(let i=0; i <150;i++){
			const cube = Mesh3D.createCube();
		cube.scale.set(0.1, 0.1, 0.1);
		cube.position.set(0, i, 0);
		this.world.addChild(cube)
		}

		for(let i=0; i <150;i++){
			const cube = Mesh3D.createCube();
		cube.scale.set(0.1, 0.1, 0.1);
		cube.position.set(i, 0, 0);
		this.world.addChild(cube)
		}
	
	cameraControl.target.z = this.player.z;
	cameraControl.target.x = this.player.x;
	cameraControl.target.y = this.player.y;
	cameraControl.distance = 50;
	cameraControl.angles.set(35,200)


		this.world.addChild(this.player, wall, this.sphere0, cube100, cube150);
		
	}
	public intersect(a:AABB, b:AABB):boolean {
		return (
		  a.min.x <= b.max.x &&
		  a.max.x >= b.min.x &&
		  a.min.y <= b.max.y &&
		  a.max.y >= b.min.y &&
		  a.min.z <= b.max.z &&
		  a.max.z >= b.min.z
		);
	  }

	public override update(dt: number): void {
		// console.log(cameraControl.angles)
		dt;
		const dragonbox = this.player.getBoundingBox()
		
		console.log(dragonbox.min, dragonbox.max)
		if (Keyboard.shared.isDown(Key.RIGHT_ARROW)) {
			cameraControl.target.z += 0.4;
		}
		if (Keyboard.shared.isDown(Key.LEFT_ARROW)) {
			cameraControl.target.z -= 0.4;
		}

		if (Keyboard.shared.isDown(Key.UP_ARROW)) {
			this.player.position.z += 0.4;
			this.crash = false
		}
		if (Keyboard.shared.isDown(Key.DOWN_ARROW) && !this.crash) {
			this.player.position.z -= 0.4;
		}

		
		if(this.player.position.z >= 0 && this.player.position.z <= 5 && !this.crash){
			this.crash = true
			console.log("ITS CRASHING", this.crash)
			// this.player.position.z = 0.4;
		}
	
	}
}
