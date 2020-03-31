export class Timer {
    private intervals: number[] = [];

    registerInterval = (action: () => void, timeout: number): void => {
        this.intervals.push(window.setInterval(action, timeout));
    };

    stopAll = (): void => {
        this.intervals.forEach((intervalId: number) => {
            window.clearInterval(intervalId);
        });

        this.intervals = [];
    };
}
