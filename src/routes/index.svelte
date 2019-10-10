<script context="module">
    import RenderComponent from '../components/RenderComponent';

	export async function preload({ params, query }) {
        return await this.fetch('/api/storyblok/home.json').then(r => r.json())
        .then( data => {
            return {
                'modules': data
            }
        });
    }
</script>
<script>
    export let modules;
</script>

<svelte:head>
    <title>Sapper project template</title>
</svelte:head>

<RenderComponent modules={modules}/>
<!-- <div class="s-heading o-row center-text">
    <h1 class="o-extra-small--24">
        {modules.headline}
    </h1>
    <!-- <h2 class="main-head">Great success!</h2> -->
    <!-- <h3 class="main-head">Great success!</h3>
    <h4 class="main-head">Great success!</h4>
    <h5 class="main-head">Great success!</h5>
    <h6 class="main-head">Great success!</h6>
</div>

<div class="s-content o-column">
    <p class="o-row o-extra-small--24 o-medium--16">Spicy jalapeno bacon ipsum dolor amet pork loin cupim bresaola alcatra drumstick rump kielbasa tail jowl ball tip andouille porchetta meatloaf turkey pork belly. Pork belly boudin ribeye swine chicken. Pork belly meatball pork chop shoulder ball tip andouille beef ribs. T-bone pork chop ham hock andouille, sausage shank pork belly doner ball tip biltong alcatra.
    <br/>
    Ham hock porchetta shank, shoulder tri-tip cupim pork frankfurter flank cow landjaeger buffalo turkey pork chop filet mignon. Rump ham hock ham andouille. Corned beef cupim t-bone, turkey ham fatback jowl. Ribeye rump andouille kevin. Landjaeger meatloaf tongue salami. Kevin burgdoggen ball tip filet mignon venison leberkas ham chicken.
    <br/>
    Short ribs pastrami corned beef shank venison tenderloin pork sirloin beef hamburger. Tri-tip tail sirloin chuck salami ground round drumstick leberkas pastrami tenderloin frankfurter hamburger. Boudin meatball cupim prosciutto beef pig. Biltong chicken ball tip swine short loin boudin shankle kielbasa shank t-bone. Bacon buffalo alcatra landjaeger shank, tenderloin tail cupim beef meatball chicken meatloaf prosciutto burgdoggen fatback.
    <br/>
    Leberkas pork filet mignon pork chop, swine t-bone rump turducken. Strip steak fatback ham corned beef brisket bresaola. Salami tenderloin porchetta brisket cupim beef. Pork belly buffalo sirloin filet mignon ham swine t-bone meatball spare ribs venison. Pork chop ball tip t-bone, tri-tip porchetta pancetta turkey venison kevin sirloin bresaola tail ham hock picanha pig. Swine meatball pig brisket, spare ribs turducken meatloaf boudin doner beef ribs cow cupim t-bone prosciutto ball tip.
    <br/>
    Jowl meatloaf swine, kielbasa leberkas biltong venison brisket pork loin fatback buffalo beef beef ribs turducken. Shankle burgdoggen sirloin, frankfurter ham hock pork chop capicola short loin pork chicken ground round pastrami tongue tenderloin jerky. Tenderloin t-bone tongue, shankle rump chicken porchetta pig kevin. Picanha pork loin filet mignon, jowl short loin alcatra boudin cupim bresaola t-bone meatloaf shank shoulder. Shoulder sirloin chicken t-bone porchetta shank ball tip frankfurter. Spare ribs burgdoggen porchetta tenderloin flank jowl.
    </p>

    <div class="s-side o-row o-medium--8">
        <textarea class="o-extra-small--24" name="text-area"/>

        <div class="o-extra-small--24 flex-center">
            <button class="primary btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>
            <button class="secondary btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>

            <button class="primary error btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>
            <button class="primary warning btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>
            <button class="primary success btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>
            <button class="primary success disabled btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>

            <button class="secondary error btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>
            <button class="secondary warning btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>
            <button class="secondary success btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>
            <button class="secondary success disabled btn-extra-small--24 btn-medium--11 btn-large--7 btn-extra-large--6">
                <span>BUTTON</span>
            </button>
        </div>
    </div>
</div>
<div class="ad o-row flex-center">
    <figure class="o-extra-small--4 center-text">
        <img alt='Borat' src='great-success.png'>
    </figure>
</div> -->

