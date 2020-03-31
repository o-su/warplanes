export type Point = {
    x: number;
    y: number;
};

export enum ProjectileSource {
    Player,
    Enemy,
}

export enum KeyCode {
    P = 80,
}

export enum ImageExtension {
    Png = "png",
}

export enum Sprite {
    Player1 = "player1",
    Player2 = "player2",
    Player3 = "player3",
    Enemy1 = "enemy1",
    Enemy1Damaged = "enemy1Damaged",
    Enemy1Destroyed = "enemy1Destroyed",
    Enemy2 = "enemy2",
    Enemy2Damaged = "enemy2Damaged",
    Enemy2Destroyed = "enemy2Destroyed",
    Enemy3 = "enemy3",
    Enemy3Damaged = "enemy3Damaged",
    Enemy3Destroyed = "enemy3Destroyed",
    Enemy4 = "enemy4",
    Enemy4Damaged = "enemy4Damaged",
    Enemy4Destroyed = "enemy4Destroyed",
    SmallIsland = "smallIsland",
    LargeIsland = "largeIsland",
    Projectile = "projectile",
    Life = "life",
}
