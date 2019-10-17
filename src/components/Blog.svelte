<script>
    import md from 'marked';

    export let entry = {};
    let copy = md(entry.copy)
    let {
        pretitle,
        title,
        subtitle
    } = entry;
</script>

<style lang="scss" global>
.md {
    & li {
        list-style-type: disc;
    }
}
</style>

<div>
    <h3>{pretitle}</h3>
    <h1>{title}</h1>
    <h4>{subtitle}</h4>
    <br/>

    <!-- NOTE Example of @html directive (Not recommended without escaped) -->
    <div class="md">
        {@html copy}
    </div>
</div>