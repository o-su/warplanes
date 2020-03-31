import { Plane } from "./plane";
import { Projectile } from "./projectile";
import { Point, ProjectileSource } from "../types";

export type PlayerConfiguration = {
    sprite: HTMLImageElement;
    width: number;
    height: number;
    gunPositions: Point[];
    spriteProjectile: HTMLImageElement;
};

export class Player extends Plane {
    private upgrades: PlayerConfiguration[];

    constructor(
        x: number,
        y: number,
        lives: number,
        config: PlayerConfiguration,
        upgrades: PlayerConfiguration[]
    ) {
        super(
            x,
            y,
            lives,
            config.sprite,
            config.width,
            config.height,
            config.gunPositions,
            config.spriteProjectile
        );
        this.upgrades = upgrades;
    }

    shoot = (): Projectile[] => super.shoot(ProjectileSource.Player);

    upgrade = (upgradeId: number): void => {
        if (this.upgrades[upgradeId]) {
            const upgrade: PlayerConfiguration = this.upgrades[upgradeId];

            this.sprite = upgrade.sprite;
            this.gunPositions = upgrade.gunPositions;
            this.width = upgrade.width;
            this.height = upgrade.height;
            this.spriteProjectile = upgrade.spriteProjectile;
        } else {
            throw new Error(`Unknown upgrade ${upgradeId}`);
        }
    };
}
