import { Point } from "../types";

export function generateRandomNumber(min: number, range: number): number {
    return Math.floor(Math.random() * (range + 1) + min);
}

export function calculateDistance(startPoint: Point, endPoint: Point): number {
    return Math.sqrt(
        Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(startPoint.y - endPoint.y, 2)
    );
}
