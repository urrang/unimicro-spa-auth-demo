<script lang="ts">
	import { auth, login } from '$lib/auth';
</script>

{#if $auth}
	<h1>Welcome! Your token is {$auth.access_token}</h1>
{:else}
	<button on:click={login}>Log in</button>
{/if}
