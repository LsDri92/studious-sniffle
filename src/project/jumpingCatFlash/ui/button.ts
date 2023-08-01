import { Container, Sprite, Texture } from "pixi.js";

export class Button extends Container {

    private def: Texture;

    private down: Texture;

    private over: Texture;

   

    private spr: Sprite;

    constructor(def: Texture, down: Texture, over: Texture,) {
        super();

        this.def = def;
        this.down = down;
        this.over = over;
        

        this.spr = Sprite.from(def);
        
        this.addChild(this.spr);

        this.spr.interactive = true;

        this.spr.on("mousedown", this.onMouseDown, this);
        this.spr.on("mouseup", this.onMouseUp, this);
        this.spr.on("mouseover", this.onMouseOver, this);
        this.spr.on("mouseout", this.onMouseOut, this);
    }

    private onMouseDown(): void {
        console.log("mouse down", this);
        this.spr.texture = this.down;

    }

    private onMouseUp(): void {
        this.emit("buttonclick!");
        this.spr.texture = this.over;
    }

    private onMouseOver(): void {
        console.log("mouse over", this)
        this.spr.texture = this.over;
    }

    private onMouseOut(): void {
        console.log("mouse out", this)
        this.spr.texture = this.def;
    }

    

}