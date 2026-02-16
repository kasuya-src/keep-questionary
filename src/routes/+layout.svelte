<script lang="ts">
	import "../app.css";
	// import type { Snippet } from "svelte";

	let { children }: { children: any } = $props();
</script>

<div class="flex flex-col h-screen items-center">
	<!-- <img class="w-50" src="/図2.png" alt="logo" />
	<div class="flex-1"> -->
		{@render children()}
	<!-- </div> -->
</div>
