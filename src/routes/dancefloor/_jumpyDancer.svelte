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
        if( x >= (height - 20)) {
            x -= 20
        }

        let y = Math.random() * width;

        if( y >= width - 20) {
            y -= 20;
        }

        const newDancer = new Dancer(
            type,
            x, y,
            dancefloor,
            (Math.random() * 500) + 200
        );

        newDancer.setStep(() => {
            newDancer.dancer.toggleAttribute('hidden')
        });

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

.default-dancer {
    height: 20px;
    width: 20px;
    background-color: $razzmatazz;
    position: absolute;
    float: left;
}

.default-button {
    @include button-base(rgba($razzmatazz, 0.75), $padding: $spacer);
}
</style>

<!-- NOTE HTML Element binding example - pt 1 -->
<button class="default-button o-extra-small--12"
    type="button"
    bind:this={dancer}
    on:click={addDancer}
    data-dancer="default">
    Blinky
</button>