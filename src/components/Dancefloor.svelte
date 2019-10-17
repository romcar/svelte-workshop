<script>
    import { onMount, onDestroy } from 'svelte';
    import DefaultDancer from '../routes/dancefloor/_defaultDancer';
    import SpinningDancer from '../routes/dancefloor/_spinningDancer';

    import { dancers, dancerCount } from '../store/index';

    let dancefloor,
        x = 0,
        y = 0;

    function lineUp() {
        x = 0;
        y = 0;

        $dancers.forEach(d => {
            const isHidden = d.hasAttribute('hidden');

            if(isHidden) {
                d.removeAttribute('hidden');
            };

            d.style.top = `${y}px`;
            d.style.left = `${x}px`;

            if(x >= (dancefloor.getBoundingClientRect().width - 24)) {
                y += d.getBoundingClientRect().height + 1;
                x = 0;
            } else {
                x += d.getBoundingClientRect().width + 1;
            }

            if(isHidden) {
                d.setAttribute('hidden', true);
            };
        })
    }

    function clear(e, skip = false) {
        if(!skip) {
            while (dancefloor.firstChild) {
                dancefloor.removeChild(dancefloor.firstChild);
            }
        }

        dancers.update(d => []);
        x = 0;
        y = 0;
    }

    onMount(async () => {
        dancefloor = document.querySelector('.dancefloor');
    });

    onDestroy(async () => {
        clear({}, true);
    });
</script>

<style lang="scss" global>
    @import './src/style/index.scss';
    .dancefloor {
        position: relative;
        border: 1px solid black;
        height: 75vh;
        float: right;
        overflow: hidden;
    }

    .count {
        font-size: 3rem;
        color: $outer-space;
    }
    .dancefloor-actions {
        float: left;
    }
</style>

<svelte:head>
    <title>Dancefloor</title>
</svelte:head>

<!-- markup (zero or more items) goes here -->
<div class="dancefloor-actions o-extra-small--24 o-medium--4">

    <DefaultDancer {dancefloor} {dancers}/>
    <SpinningDancer {dancefloor} {dancers}/>

    <button class="primary o-extra-small--12"
        type="button"
        on:click={lineUp} >
        Line Up
    </button>
    <button class="secondary o-extra-small--12"
        type="button"
        on:click={clear} >
        Clear
    </button>

    <div class="count o-row o-extra-small--24">
        {$dancerCount}
    </div>
</div>

<div class="dancefloor o-extra-small--24 o-medium--20">
</div>