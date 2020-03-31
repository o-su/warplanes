import { Player, PlayerConfiguration } from "./player";
import { Enemy } from "./enemy";
import { Point, Sprite } from "../types";
import { CanvasObject } from "./canvasObject";
import { generateRandomNumber } from "../utils/numberUtils";
import { SpriteStore } from "./spriteStore";

export class SceneGenerator {
    private sceneWidth: number;
    private spriteStore: SpriteStore;

    constructor(sceneWidth: number, spriteStore: SpriteStore) {
        this.sceneWidth = sceneWidth;
        this.spriteStore = spriteStore;
    }

    createPlayer = (x: number, y: number): Player => {
        const sprite = this.spriteStore.getSprite(Sprite.Player1);
        const player2Sprite = this.spriteStore.getSprite(Sprite.Player2);
        const player3Sprite = this.spriteStore.getSprite(Sprite.Player3);
        const projectileSprite = this.spriteStore.getSprite(Sprite.Projectile);

        const level2Upgrade: PlayerConfiguration = {
            sprite: player2Sprite,
            gunPositions: [
                { x: -28, y: 0 },
                { x: -2, y: 0 },
            ],
            width: player2Sprite.width,
            height: player2Sprite.height,
            spriteProjectile: projectileSprite,
        };

        const level3Upgrade: PlayerConfiguration = {
            sprite: player3Sprite,
            gunPositions: [
                { x: -50, y: 0 },
                { x: -28, y: 0 },
                { x: 2, y: 0 },
                { x: 20, y: 0 },
            ],
            width: player3Sprite.width,
            height: player3Sprite.height,
            spriteProjectile: projectileSprite,
        };

        return new Player(
            x,
            y,
            5,
            {
                sprite,
                gunPositions: [{ x: -15, y: -5 }],
                width: sprite.width,
                height: sprite.height,
                spriteProjectile: projectileSprite,
            },
            [level2Upgrade, level3Upgrade]
        );
    };

    createEnemy1 = (): Enemy => {
        return this.createEnemy(
            1,
            0.3,
            this.spriteStore.getSprite(Sprite.Enemy1),
            this.spriteStore.getSprite(Sprite.Enemy1Damaged),
            this.spriteStore.getSprite(Sprite.Enemy1Destroyed),
            []
        );
    };

    createEnemy2 = (): Enemy => {
        return this.createEnemy(
            2,
            0.4,
            this.spriteStore.getSprite(Sprite.Enemy2),
            this.spriteStore.getSprite(Sprite.Enemy2Damaged),
            this.spriteStore.getSprite(Sprite.Enemy2Destroyed),
            [
                { x: 40, y: 65 },
                { x: 60, y: 65 },
            ]
        );
    };

    createEnemy3 = (): Enemy => {
        return this.createEnemy(
            3,
            0.5,
            this.spriteStore.getSprite(Sprite.Enemy3),
            this.spriteStore.getSprite(Sprite.Enemy3Damaged),
            this.spriteStore.getSprite(Sprite.Enemy3Destroyed),
            [
                { x: 40, y: 65 },
                { x: 60, y: 65 },
            ]
        );
    };

    createEnemy4 = (): Enemy => {
        return this.createEnemy(
            4,
            0.6,
            this.spriteStore.getSprite(Sprite.Enemy4),
            this.spriteStore.getSprite(Sprite.Enemy4Damaged),
            this.spriteStore.getSprite(Sprite.Enemy4Destroyed),
            [
                { x: 40, y: 65 },
                { x: 60, y: 65 },
            ]
        );
    };

    private createEnemy = (
        lives: number,
        speed: number,
        sprite: HTMLImageElement,
        spriteDamaged: HTMLImageElement,
        spriteDestroyed: HTMLImageElement,
        gunPositions: Point[]
    ): Enemy => {
        return new Enemy(
            generateRandomNumber(0, this.sceneWidth - sprite.width),
            -92,
            lives,
            speed,
            sprite,
            gunPositions,
            sprite.width,
            sprite.height,
            spriteDamaged,
            spriteDestroyed,
            this.spriteStore.getSprite(Sprite.Projectile)
        );
    };

    createSmallIsland = (): CanvasObject => {
        return this.createIsland(this.spriteStore.getSprite(Sprite.SmallIsland));
    };

    createLargeIsland = (): CanvasObject => {
        return this.createIsland(this.spriteStore.getSprite(Sprite.LargeIsland));
    };

    createIsland = (sprite: HTMLImageElement): CanvasObject => {
        return new CanvasObject(generateRandomNumber(0, this.sceneWidth - 110), -188, sprite);
    };
}
