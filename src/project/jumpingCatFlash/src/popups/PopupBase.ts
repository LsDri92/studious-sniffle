import { PixiScene } from "src/engine/scenemanager/scenes/PixiScene";
import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Sprite } from "@pixi/sprite";
import { Tween } from "tweedle.js";
import { ScaleHelper } from "../../../../engine/utils/ScaleHelper";
import { Text } from "@pixi/text";
import { Timer } from "../../../../engine/tweens/Timer";

export class PopupBase extends PixiScene {
	protected tweenContainer: Container;
	protected background: Sprite;
	protected title: Text;
	public fadeAndBlocker: Graphics;
	public resizeContainer: Container;

	constructor() {
		super();

		// A gray background to block the clicks and dim the screen.
		this.fadeAndBlocker = new Graphics();
		this.fadeAndBlocker.beginFill(0x000000, 0.5); // chose color and opacity of the fade
		this.fadeAndBlocker.drawRect(0, 0, 1, 1); // Size is one pixel, will be resized on resize
		this.fadeAndBlocker.endFill();
		this.fadeAndBlocker.interactive = true; // Make interactive to "block" the clicks outside the popup
		this.addChild(this.fadeAndBlocker);

		// This will be resized and centered in the onResize.
		this.resizeContainer = new Container();
		this.addChild(this.resizeContainer);

		// This will tween the scale from 0 to 1
		// all the children of this container will inherit that animation
		this.tweenContainer = new Container();
		this.resizeContainer.addChild(this.tweenContainer);

		// Build the popup. Forget about scales, they are inherited from the resizeContainer
		this.background = Sprite.from("package-1/jumpingCatFlash/LevelPop.png");

		// I change the position instead of using anchor to keep the zero at the top-left corner of the popup body.
		// It makes it a bit easier to position objects inside it
		this.background.x = -this.background.width / 2;
		this.background.y = -this.background.height / 2;
		this.tweenContainer.addChild(this.background);

		// TODO Call custom textStyle here
		this.title = new Text("");
		this.title.style = { align: "center", fontSize: 20 };
		this.title.anchor.set(0.5);
		this.title.y = this.background.y + this.title.height + 50;
		this.tweenContainer.addChild(this.title);
	}

	public override onStart(): void {
		// Start is the first update before rendering.
		// We set up and fire our tweens here because onResize was called right before this, so we are sure we have good sizes.

		this.tweenContainer.interactiveChildren = false; // Prevent clicking the buttons during the animation.

		this.fadeAndBlocker.alpha = 0;
		this.tweenContainer.scale.set(0);

		const fadeAnimation = new Tween(this.fadeAndBlocker).to({ alpha: 1 }, 500);
		const elasticAnimaton = new Tween(this.tweenContainer).to({ scale: { x: 0.5, y: 0.5 } }, 500);
		elasticAnimaton.onComplete(() => (this.tweenContainer.interactiveChildren = true)); // Re-enable clicking the buttons after the animation.
		fadeAnimation.chain(elasticAnimaton);
		fadeAnimation.start();
	}
	/** The callback will be passed and executed in the main scene (Game) when the popup closes.
	 * This stops and hides the timer too, if theres one
	 */
	protected animateAndClose(callback: Function, delay: number = 0): void {
		new Timer()
			.to(delay)
			.start()
			.onComplete(() => {
				// The important function is `this.closeHandler()`. We make a nice animation before calling it.

				this.tweenContainer.interactiveChildren = false; // Prevent clicking the buttons during the animation.

				const fadeAnimation = new Tween(this.fadeAndBlocker).to({ alpha: 0 }, 500);
				const elasticAnimaton = new Tween(this.tweenContainer).to({ scale: { x: 0, y: 0 } }, 500);

				elasticAnimaton.chain(fadeAnimation);
				elasticAnimaton.start();

				fadeAnimation.onComplete(() => {
					this.closeHandler(callback);
				}); // this.closeHandler() is the magic word for closing and destroying a popup!
			});
	}

	public override onResize(newW: number, newH: number): void {
		// it's just a pixel and we resize it to cover the whole screen;
		this.fadeAndBlocker.width = newW;
		this.fadeAndBlocker.height = newH;

		// Resize the resize container and call it a day.
		ScaleHelper.setScaleRelativeToScreen(this.resizeContainer, newW, newH, 0.95, 0.8, ScaleHelper.FIT);
		this.resizeContainer.x = newW / 2;
		this.resizeContainer.y = newH / 2;
	}
}
