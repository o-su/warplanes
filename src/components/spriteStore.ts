import { ImageExtension } from "../types";

export class SpriteStore {
    private sprites: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    loadSprite = (spriteName: string, fileExtension: ImageExtension): Promise<void> => {
        return new Promise<void>((resolve) => {
            const image: HTMLImageElement = new Image();

            image.src = `${this.path}${spriteName}.${fileExtension}`;
            this.sprites.set(spriteName, image);
            image.onload = () => resolve();
        });
    };

    getSprite = (spriteName: string): HTMLImageElement => {
        const sprite: HTMLImageElement | undefined = this.sprites.get(spriteName);

        if (sprite) {
            return sprite;
        }

        throw new Error(`Unknown sprite ${spriteName}`);
    };
}
