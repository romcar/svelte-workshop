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
