import type { BaseTexture } from "@pixi/core";
import { Rectangle, Texture } from "@pixi/core";

/* eslint-disable @typescript-eslint/naming-convention */
export function GetTileTexture(baseTexture: BaseTexture, x: number, y: number, w: number, h: number): Texture {
	// If we ask the same texture, with the same rectangle, we get the same name
	const cacheKey: string = `${baseTexture.cacheId}-${x}-${y}-${w}-${h}`;
	try {
		// if we already created this tile, we just return it, it's saved inside pixi
		return Texture.from(cacheKey, {}, true); // This true makes the try catch work
	} catch {
		// The first time seeing this tile, let's make it.
		const retval = new Texture(baseTexture, new Rectangle(x, y, w, h));
		// We save it for future use
		Texture.addToCache(retval, cacheKey);
		return retval;
	}
}
