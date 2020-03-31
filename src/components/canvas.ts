import { Point } from "../types";

export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    clear = (): void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    getCtx = (): CanvasRenderingContext2D => this.ctx;

    getCenter = (): Point => ({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
    });

    getHeight = (): number => this.canvas.height;

    getWidth = (): number => this.canvas.width;

    getBoundingRect = (): ClientRect => this.canvas.getBoundingClientRect();

    isInside = (point: Point): boolean => {
        return (
            point.x > 0 &&
            point.x < this.canvas.width &&
            point.y > 0 &&
            point.y < this.canvas.height
        );
    };

    addEventListener = <K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any
    ): void => {
        this.canvas.addEventListener(type, listener);
    };
}
