import { applyCenterStyle } from "../styles";

export class MenuRenderer {
    private menu: HTMLElement | undefined;

    hideMenu(): void {
        if (this.menu) {
            document.body.removeChild(this.menu);
        }
    }

    renderMenu = (score: number, onPlay: () => void): void => {
        const element = document.createElement("div");

        element.style.width = "350px";
        element.style.height = "200px";
        element.style.backgroundColor = "#a5d9f7";
        applyCenterStyle(element);

        element.appendChild(this.renderTitle());
        element.appendChild(this.renderScore(score));
        element.appendChild(this.renderPlayButton(onPlay));

        this.menu = document.body.appendChild(element);
    };

    renderTitle = (): HTMLElement => {
        const element: HTMLElement = document.createElement("h1");

        element.innerText = "GAME OVER";
        element.style.color = "#3fa4e2";

        return element;
    };

    renderScore = (score: number): HTMLElement => {
        const element: HTMLElement = document.createElement("p");

        element.innerText = `Score: ${score}`;
        element.style.fontSize = "20px";
        element.style.color = "#3fa4e2";

        return element;
    };

    renderPlayButton = (onClick: () => void): HTMLElement => {
        const element: HTMLElement = document.createElement("div");

        element.innerText = "PLAY";
        element.style.backgroundColor = "#3fa4e2";
        element.style.color = "#a5d9f7";
        element.style.padding = "15px 25px";
        element.style.display = "inline-block";
        element.style.fontWeight = "bold";
        element.style.cursor = "pointer";

        element.onclick = () => {
            this.hideMenu();
            onClick();
        };

        return element;
    };
}
