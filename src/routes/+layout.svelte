<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />
	<main>{@render children()}</main>
	<Footer />
</div>

<style>
	.app { 
		
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		margin-top: 100px;
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
	
	
		box-sizing: border-box;
	}

	
</style>
