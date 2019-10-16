import _ from 'lodash';

export function positionAbsoluteThenRevert(target) {

    if(!_.isArray(target) || !target.length) {
        return false;
    }

    target.forEach(t => {
        t.styles.postion = 'absolute';

        setTimeout(() => {
            t.styles.position = 'unset';
        }, 410);
    });
    return true;
}

export function randomDancer(x) {
    return Math.floor(Math.random() * x) ;
}