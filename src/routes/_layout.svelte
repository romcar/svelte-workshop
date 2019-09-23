<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style lang="scss" global>
	@import '../style/index.scss';
</style>

<Nav class="main-nav" {segment}/>

<main class="wrapper">
	<slot></slot>
</main>

<footer class="main-footer">
	Legs moving side to side - smack 'em smack 'em in the air.
</footer>