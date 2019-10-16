<script>
    import { onMount } from 'svelte';
    import { Dancer } from '../components/js/Dancer';
    import { randomDancer } from '../js/utils';
    let dancers = [],
        bounds = {},
        linedup = false,
        dancefloor,
        dancerTypes;

    function pairOff() {
        const partners = [
            dancers[randomDancer(dancers.length)],
            dancers[randomDancer(dancers.length)]
        ];
    }

    function lineUp() {
        this.dancers.forEach()
    }

    function addDancer(e) {
        const { height, width } = dancefloor.getBoundingClientRect();
        const type = e.target.dataset.dancer;

        let x = Math.random() * height;

        if( x >= (height - 20)) {
            x -= 20
        }

        let y = Math.random() * width;

        if( y >= width - 20) {
            y -= 20;
        }

        const newDancer = dancerTypes[type](x, y, 500);
        dancers.push(newDancer);
        newDancer.dance();
    }

    onMount(async () => {
        dancefloor = document.querySelector('.dancefloor');
        dancerTypes = {
            'default': (x, y, step) => new Dancer('default', x, y, step, dancefloor)
        }
    });


</script>

<style>
    .dancefloor {
        position: relative;
        border: 1px solid black;
        height: 90vh;
        float: right;
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
<button type="button"
    on:click={pairOff}>
    Pair Off
</button>
<button type="button"
    on:click={addDancer}
    data-dancer="default">
    Add Dancer
</button>
<button type="button"
    on:click={lineUp} >
    Line Up
</button>
<button type="button" on:click="" >
    Clear
</button>

</div>
<div class="dancefloor o-extra-small--24 o-medium--20">
</div>