import { Game } from "./components/game";
import { applyCanvasStyle, applyCenterStyle } from "./styles";
import { Renderer } from "./components/renderer";
import { Canvas } from "./components/canvas";
import { ImageExtension, Sprite } from "./types";
import { SpriteStore } from "./components/spriteStore";

document.addEventListener("DOMContentLoaded", async () => {
    const spriteStore = await createSpriteStore();
    const htmlCanvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = htmlCanvas.getContext("2d");

    if (ctx) {
        const canvas: Canvas = new Canvas(htmlCanvas, ctx);
        const renderer: Renderer = new Renderer(canvas);
        const game: Game = new Game(canvas, spriteStore, renderer);

        applyCanvasStyle(htmlCanvas);
        applyCenterStyle(htmlCanvas);

        game.run();
    }
});

async function createSpriteStore(): Promise<SpriteStore> {
    const spriteStore = new SpriteStore("./sprites/");

    await Promise.all(
        Object.values(Sprite).map((sprite) => spriteStore.loadSprite(sprite, ImageExtension.Png))
    );

    return spriteStore;
}
