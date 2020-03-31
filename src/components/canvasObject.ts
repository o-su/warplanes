import { Point } from "../types";

export class CanvasObject {
    protected x: number;
    protected y: number;
    protected sprite: HTMLImageElement;

    constructor(x: number, y: number, sprite: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    getX = (): number => this.x;

    setX = (x: number): void => {
        this.x = x;
    };

    getY = (): number => this.y;

    getPosition = (): Point => ({
        x: this.x,
        y: this.y,
    });

    move = (): void => {
        this.y += 0.1;
    };

    getSprite = (): HTMLImageElement => this.sprite;
}
