import { Plane } from "./plane";
import { Projectile } from "./projectile";
import { Point, ProjectileSource } from "../types";

export class Enemy extends Plane {
    protected spriteDamaged: HTMLImageElement;
    protected spriteDestroyed: HTMLImageElement;
    protected speed: number;

    constructor(
        x: number,
        y: number,
        lives: number,
        speed: number,
        sprite: HTMLImageElement,
        gunPositions: Point[],
        width: number,
        height: number,
        spriteDamaged: HTMLImageElement,
        spriteDestroyed: HTMLImageElement,
        spriteProjectile: HTMLImageElement
    ) {
        super(x, y, lives, sprite, width, height, gunPositions, spriteProjectile);
        this.speed = speed;
        this.spriteDamaged = spriteDamaged;
        this.spriteDestroyed = spriteDestroyed;
    }

    move = (): void => {
        this.y += this.speed;
    };

    shoot = (): Projectile[] => super.shoot(ProjectileSource.Enemy);

    destroy = (): void => {
        this.sprite = this.spriteDamaged;
        setTimeout(() => {
            this.sprite = this.spriteDestroyed;

            setTimeout(() => super.destroy(), 800);
        }, 800);
    };
}
