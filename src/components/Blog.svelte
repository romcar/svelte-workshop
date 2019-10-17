<script>
    export let entry = {};
</script>

<div>
    <h3>{entry.pretitle}</h3>
    <h1>{entry.title}</h1>
    <h4>{entry.subtitle}</h4>

    <!-- NOTE Example of @html directive (Not recommended without escaped) -->
    {@html entry.copy}
</div>