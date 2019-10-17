<script>
    import { Dancer } from '../../components/js/Dancer';
    import { dancers } from '../../store/index';

    export let dancefloor;
    let dancer;

    function addDancer() {
        const {
            height,
            width
        } = dancefloor.getBoundingClientRect();

        // NOTE HTML Element Binding example - pt 2
        const type = dancer.dataset.dancer ;

        let x = Math.random() * height;

        /**
         * NOTE Do whatever you need to do to keep the
         * dancer inside the dancefloor here
         **/
        if( x >= (height - 22)) {
            x -= 22
        }

        let y = Math.random() * width;

        if( y >= width - 22) {
            y -= 22;
        }

        const newDancer = new Dancer(
            type,
            x, y,
            dancefloor,
            (Math.random() * 500) + 200
        );

        dancers.update( d => {
            d.push(newDancer.dancer);
            return d;
        });

        newDancer.dance();
    }
</script>

<style lang="scss" global>
/**
* NOTE  Not sure why I have to keep doing this.
* I thought I set this up to be global. But moving
* forward import this.
**/
@import './src/style/index.scss';

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(361deg);
    }
}

.spinning-dancer {
    height: 20px;
    width: 20px;
    animation: spin 1s infinite;
    background-color: $teal-blue;
    position: absolute;
    float: left;
}

.spinning-button {
    @include button-base(rgba($teal-blue, 0.75), $padding: $spacer);
}
</style>

<!-- NOTE HTML Element binding example - pt 1 -->
<button class="spinning-button o-extra-small--12"
    type="button"
    bind:this={dancer}
    on:click={addDancer}
    data-dancer="spinning">
    Spinning
</button>