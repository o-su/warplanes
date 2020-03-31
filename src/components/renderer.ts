import { CanvasObject } from "./canvasObject";
import { Enemy } from "./enemy";
import { Projectile } from "./projectile";
import { Player } from "./player";
import { Canvas } from "./canvas";
import { cursorOffsetX, whiteColor } from "../constants";

export class Renderer {
    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    clearCanvas = (): void => this.canvas.clear();

    renderIslands = (islands: CanvasObject[]): void => {
        islands.forEach((island: CanvasObject) => {
            this.canvas.getCtx().drawImage(island.getSprite(), island.getX(), island.getY());
        });
    };

    renderPlayer = (player: Player): void => {
        this.canvas
            .getCtx()
            .drawImage(
                player.getSprite(),
                player.getX() - player.getWidth() / 2 - cursorOffsetX,
                player.getY(),
                player.getWidth(),
                player.getHeight()
            );
    };

    renderEnemies = (enemies: Enemy[]): void => {
        enemies.forEach((enemy: Enemy) => {
            this.canvas.getCtx().drawImage(enemy.getSprite(), enemy.getX(), enemy.getY());
        });
    };

    renderProjectiles = (projectiles: Projectile[]): void => {
        projectiles.forEach((projectile: Projectile) => {
            this.canvas
                .getCtx()
                .drawImage(projectile.getSprite(), projectile.getX(), projectile.getY());
        });
    };

    renderPauseButton = (): void => {
        const ctx: CanvasRenderingContext2D = this.canvas.getCtx();

        ctx.font = "14px Arial";
        ctx.fillStyle = whiteColor;
        ctx.fillText("Pause (P)", 5, this.canvas.getHeight() - 8);
    };

    renderScore = (score: number): void => {
        const ctx: CanvasRenderingContext2D = this.canvas.getCtx();

        ctx.font = "14px Arial";
        ctx.fillStyle = whiteColor;
        ctx.fillText(`Score: ${score}`, 80, this.canvas.getHeight() - 8);
    };

    renderLives = (lives: number, sprite: HTMLImageElement): void => {
        const ctx: CanvasRenderingContext2D = this.canvas.getCtx();

        for (let i: number = 0; i < lives; i++) {
            ctx.drawImage(
                sprite,
                this.canvas.getWidth() - (sprite.width + i * 18) - 5,
                this.canvas.getHeight() - sprite.height - 8
            );
        }
    };
}
