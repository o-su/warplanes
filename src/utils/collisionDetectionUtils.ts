import { Projectile } from "../components/projectile";
import { ProjectileSource } from "../types";
import { Player } from "../components/player";
import { Enemy } from "../components/enemy";
import { calculateDistance } from "./numberUtils";

export function isSomeEnemyHitByProjectile(projectile: Projectile, enemies: Enemy[]): boolean {
    return enemies.some((enemy: Enemy) => {
        return isEnemyHitByProjectile(projectile, enemy);
    });
}

export function isEnemyHitByProjectile(projectile: Projectile, enemy: Enemy): boolean {
    const distanceBetweenProjectileAndEnemy: number = calculateDistance(
        projectile.getPosition(),
        enemy.getCenter()
    );

    if (
        projectile.getSource() === ProjectileSource.Player &&
        distanceBetweenProjectileAndEnemy <= enemy.getWidth() / 2
    ) {
        enemy.destroy();

        return true;
    }

    return false;
}

export function isPlayerHitByProjectile(projectile: Projectile, player: Player): boolean {
    const center = player.getCenter();

    center.x -= 50;

    const distanceBetweenProjectileAndPlayer: number = calculateDistance(
        projectile.getPosition(),
        center
    );

    return (
        player.isAlive() &&
        projectile.getSource() === ProjectileSource.Enemy &&
        distanceBetweenProjectileAndPlayer <= player.getWidth() / 2
    );
}
