<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255, 183, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav class="main-nav">
	<ul>
		<li>
            <a rel=prefetch class='{segment === undefined ? "selected" : ""}' href='.'>
                Home
            </a>
        </li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
			the blog data when we hover over the link or tap it on a touchscreen -->
		<li>
            <a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>
                Blog
            </a>
        </li>
		<li>
            <a rel=prefetch class='{segment === "todo" ? "selected" : ""}' href='todo'>
                Todo
            </a>
        </li>
		<li>
            <a rel=prefetch class='{segment === "dancefloor" ? "selected" : ""}' href='dancefloor'>
				Dance Floor
            </a>
        </li>
	</ul>
</nav>