export class Dancer {
    constructor(dancer, top, left, dancefloor, interval=0) {
        this.interval = Number(interval);
        this.dancer = document.createElement(`span`);
        this.dancer.classList.add(`${dancer}-dancer`);
        this.dancefloor = dancefloor;
        this.top = top;
        this.left = left;
        this.stepCB = () => {};

        return this;
    }

    dance() {
        this.setPosition(this.top, this.left);
        this.step();
    }

    setStep(cb) {
        this.stepCB = cb;
    }

    step() {
        setTimeout(this.step.bind(this), this.interval);
        this.stepCB();
    }

    setPosition(top, left) {
        this.dancer.style.top = `${Math.floor(top)}px`;
        this.dancer.style.left = `${Math.floor(left)}px`;

        this.dancefloor.append(this.dancer);
    }
}