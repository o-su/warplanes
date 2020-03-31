import { Player } from "./player";
import { Enemy } from "./enemy";
import { Projectile } from "./projectile";
import { CanvasObject } from "./canvasObject";
import { KeyCode, Sprite } from "../types";
import { Renderer } from "./renderer";
import { Canvas } from "./canvas";
import { SceneGenerator } from "./sceneGenerator";
import { Timer } from "./timer";
import {
    isSomeEnemyHitByProjectile,
    isPlayerHitByProjectile,
} from "../utils/collisionDetectionUtils";
import { MenuRenderer } from "./menuRenderer";
import { generateRandomNumber } from "../utils/numberUtils";
import { SpriteStore } from "./spriteStore";

export class Game {
    private canvas: Canvas;
    private spriteStore: SpriteStore;
    private player!: Player;
    private enemies: Enemy[] = [];
    private projectiles: Projectile[] = [];
    private islands: CanvasObject[] = [];
    private score: number = 0;
    private paused: boolean = false;
    private renderer: Renderer;
    private sceneGenerator: SceneGenerator;
    private timer!: Timer;
    private menuRenderer: MenuRenderer = new MenuRenderer();

    constructor(canvas: Canvas, spriteStore: SpriteStore, renderer: Renderer) {
        this.canvas = canvas;
        this.spriteStore = spriteStore;
        this.renderer = renderer;
        this.sceneGenerator = new SceneGenerator(this.canvas.getWidth(), spriteStore);

        this.init();
        this.registerListeners();
    }

    private init = (): void => {
        this.player = this.sceneGenerator.createPlayer(this.canvas.getCenter().x, 700);
        this.enemies = [];
        this.projectiles = [];
        this.islands = [];
        this.timer = new Timer();
        this.score = 0;
    };

    private registerListeners = (): void => {
        this.canvas.addEventListener("mousemove", this.movePlayerHorizontally);
        this.canvas.addEventListener("mousedown", () =>
            this.projectiles.push(...this.player.shoot())
        );
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                this.resume();
            } else {
                this.pause();
            }
        });
    };

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (this.player.isAlive() && event.keyCode === KeyCode.P) {
            this.togglePause();
        }
    };

    private movePlayerHorizontally = (event: MouseEvent): void => {
        const rect: ClientRect = this.canvas.getBoundingRect();
        const cursorOffset: number = this.player.getWidth() / 2;

        if (
            event.pageX >= rect.left + cursorOffset &&
            event.pageX <= rect.left + this.canvas.getWidth() - cursorOffset
        ) {
            this.player.setX(event.pageX - rect.left);
        }
    };

    run = (): void => {
        this.timer.registerInterval(() => {
            this.moveIslands();
            this.moveEnemies();
            this.moveProjectiles();
            this.handleCollisions();

            if (!this.player.isAlive()) {
                this.stop();
            }

            this.upgradePlayer();
            this.removeHiddenObjects();
            this.render();
        }, 1);

        this.timer.registerInterval(() => this.orderEnemiesToShoot(), 1 * 1000);
        this.timer.registerInterval(() => this.createEnemies(), 3 * 1000);
        this.timer.registerInterval(() => this.addIsland(), 10 * 1000);
    };

    private stop = (): void => {
        this.pause();
        this.menuRenderer.renderMenu(this.score, () => {
            this.init();
            this.resume();
        });
    };

    private togglePause = (): void => {
        if (this.paused === false) {
            this.pause();
        } else {
            this.resume();
        }
    };

    private pause = (): void => {
        this.paused = true;
        this.timer.stopAll();
    };

    private resume = (): void => {
        this.paused = false;
        this.run();
    };

    private removeHiddenObjects = (): void => {
        this.removeHiddenIslands();
        this.removeHiddenEnemies();
    };

    private removeHiddenIslands = (): void => {
        this.islands = this.islands.filter(
            (island: CanvasObject) => island.getY() < this.canvas.getHeight()
        );
    };

    private removeHiddenEnemies = (): void => {
        this.enemies = this.enemies.filter((enemy: Enemy) => {
            const isAlive: boolean = enemy.isAlive();

            if (!isAlive) {
                this.score++;
            }

            return isAlive && enemy.getY() < this.canvas.getHeight();
        });
    };

    private moveIslands = (): void => {
        this.islands.forEach((island: CanvasObject) => island.move());
    };

    private moveEnemies = (): void => {
        this.enemies.forEach((enemy: Enemy) => enemy.move());
    };

    private orderEnemiesToShoot = (): void => {
        this.enemies.forEach((enemy: Enemy) => {
            if (enemy.isAlive()) {
                this.projectiles.push(...enemy.shoot());
            }
        });
    };

    private moveProjectiles = (): void => {
        this.projectiles.forEach((projectile: Projectile) => {
            projectile.move();
        });
    };

    private upgradePlayer = (): void => {
        if (this.score === 20) {
            this.player.upgrade(0);
        }

        if (this.score === 40) {
            this.player.upgrade(1);
        }
    };

    private createEnemies = (): void => {
        if (this.score <= 10) {
            this.enemies.push(this.sceneGenerator.createEnemy1());
        } else if (this.score <= 20) {
            this.enemies.push(this.sceneGenerator.createEnemy2());
        } else if (this.score <= 30) {
            this.enemies.push(this.sceneGenerator.createEnemy3());
        } else {
            this.enemies.push(this.sceneGenerator.createEnemy4());
        }
    };

    private addIsland = (): void => {
        if (generateRandomNumber(0, 2) === 1) {
            this.addLargeIsland();
        } else {
            this.addSmallIsland();
        }
    };

    private addLargeIsland = (): void => {
        this.islands.push(this.sceneGenerator.createLargeIsland());
    };

    private addSmallIsland = (): void => {
        this.islands.push(this.sceneGenerator.createSmallIsland());
    };

    private handleCollisions = (): void => {
        this.projectiles = this.projectiles.filter((projectile: Projectile) => {
            if (isSomeEnemyHitByProjectile(projectile, this.enemies)) {
                return false;
            }

            if (isPlayerHitByProjectile(projectile, this.player)) {
                this.player.destroy();

                return false;
            }

            return this.canvas.isInside(projectile.getPosition());
        });
    };

    private render = (): void => {
        const renderer: Renderer = this.renderer;

        renderer.clearCanvas();
        renderer.renderIslands(this.islands);
        renderer.renderPlayer(this.player);
        renderer.renderEnemies(this.enemies);
        renderer.renderProjectiles(this.projectiles);
        renderer.renderPauseButton();
        renderer.renderScore(this.score);
        renderer.renderLives(this.player.getLives(), this.spriteStore.getSprite(Sprite.Life));
    };
}
