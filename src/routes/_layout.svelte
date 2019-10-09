<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style lang="scss" global>
	@import '../style/index.scss';
</style>

<Nav {segment}/>

<main class="container">
	<slot></slot>
</main>

<footer class="main-footer o-row center-text u-margin-top--large">
	Legs moving side to side - smack 'em smack 'em in the air.
</footer>