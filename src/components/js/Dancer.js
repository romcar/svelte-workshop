export class Dancer {
    constructor({dancer, height, width, top, left, interval=0, dancefloor}) {
        this.interval = Number(interval);
        this.dancer = document.createElement(`span.${dancer}`);
        this.dancefloor = dancefloor;
        this.height = 20;
        this.width = 20;
        this.styleDancer();

        return this.dancer;
    }

    dance() {
        this.setPosition(top, left);
        this.step();
    }

    step() {
        setTimeout(this.step.bind(this), this.interval);
        this.dancer.toggleAttribute('hidden');
    }

    setPosition(top, left) {
        this.dancer.style.top = `${Math.floor(top)}px`;
        this.dancer.style.left = `${Math.floor(left)}px`;

        this.dancefloor.append(this.dancer);
    }

    styleDancer(options) {
        this.dancer.style.backgroundColor = '#FF0000';
        this.dancer.style.height = `${this.height}px`;
        this.dancer.style.width = `${this.width}px`;
        this.dancer.style.position = 'absolute';
    }
}