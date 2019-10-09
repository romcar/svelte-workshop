<script>
    import Blog from './Blog.svelte';

    export let modules = {};

</script>

{#each modules.body as module (module._uid)}

    {#if module.component.toLowerCase() === "blog"}
        <Blog entry={module}/>
    {/if}
{/each}
