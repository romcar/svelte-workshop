export class Dancer {
    constructor(top, left, interval=0) {
        this.interval = Number(interval);
        this.dancer = document.createElement('span.dancer');

        this.setPosition(top, left);
    }

    setPosition(top, left) {
        let styleSettings = {
            top,
            left,
        };
        this.dancer.css(styleSettings);
    }
}
