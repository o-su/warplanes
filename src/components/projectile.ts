import { CanvasObject } from "./canvasObject";
import { ProjectileSource } from "../types";

export class Projectile extends CanvasObject {
    private source: ProjectileSource;

    constructor(x: number, y: number, sprite: HTMLImageElement, source: ProjectileSource) {
        super(x, y, sprite);
        this.source = source;
    }

    getSource = (): ProjectileSource => this.source;

    move = (): void => {
        switch (this.source) {
            case ProjectileSource.Player:
                this.y--;
                break;
            case ProjectileSource.Enemy:
                this.y++;
                break;
            default:
                throw new Error("Unexpected projectile source");
        }
    };
}
