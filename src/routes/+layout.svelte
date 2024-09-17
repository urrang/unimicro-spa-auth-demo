<script lang="ts">
	import { onMount } from 'svelte';
	import { initAuth } from '$lib/auth';

	onMount(() => initAuth());
</script>

<slot />
