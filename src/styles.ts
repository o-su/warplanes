import { blueColor } from "./constants";

export function applyCanvasStyle(canvas: HTMLCanvasElement): void {
    document.body.style.textAlign = "center";
    document.body.style.fontFamily = "Arial, Helvetica, sans-serif";

    canvas.style.backgroundColor = blueColor;
    canvas.style.margin = "auto";
    canvas.style.cursor = "crosshair";
}

export function applyCenterStyle(element: HTMLElement): void {
    element.style.position = "absolute";
    element.style.left = "50%";
    element.style.top = "50%";
    element.style.transform = "translate(-50%,-50%)";
}
