import { CanvasObject } from "./canvasObject";
import { Point, ProjectileSource } from "../types";
import { Projectile } from "./projectile";

export class Plane extends CanvasObject {
    protected gunPositions: Point[];
    protected width: number;
    protected height: number;
    protected spriteProjectile: HTMLImageElement;
    protected lives: number = 0;

    constructor(
        x: number,
        y: number,
        lives: number,
        sprite: HTMLImageElement,
        width: number,
        height: number,
        gunPositions: Point[],
        spriteProjectile: HTMLImageElement
    ) {
        super(x, y, sprite);
        this.gunPositions = gunPositions;
        this.width = width;
        this.height = height;
        this.lives = lives;
        this.spriteProjectile = spriteProjectile;
    }

    getWidth = (): number => this.width;

    getHeight = (): number => this.height;

    getCenter = (): Point => ({
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
    });

    shoot(projectileSource: ProjectileSource): Projectile[] {
        return this.gunPositions.map(
            (gunPosition: Point) =>
                new Projectile(
                    this.x + gunPosition.x,
                    this.y + gunPosition.y,
                    this.spriteProjectile,
                    projectileSource
                )
        );
    }

    getLives = (): number => this.lives;

    isAlive = (): boolean => this.lives > 0;

    destroy(): void {
        if (this.lives > 0) {
            this.lives--;
        }
    }
}
