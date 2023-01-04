<script lang="ts">
	import Game from '../components/game.svelte';
	import Settings from '../components/settings.svelte';

    import '../app.css';

let tabs = ['Spiel', 'Einstellungen'];
let activeTab = 1;

</script>

{#if activeTab === 0}
	<Game />
{:else if activeTab === 1}
	<Settings />
{/if}


<div class="btm-nav">
	{#each tabs as tab, index}
		<button on:click={() => (activeTab = index)} class:active={index === activeTab}>{tab}</button>
	{/each}
</div>