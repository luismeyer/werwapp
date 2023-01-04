<script lang="ts">
	import { t, locale, locales } from "../lib/translation/i18n";
	import Game from '../components/game.svelte';
	import Settings from '../components/settings.svelte';

    import '../app.css';

let tabs = [  "game.game",
      "game.settings"];

	let activeTab = 0;
</script>


{#if activeTab === 0}
	<Game />
{:else if activeTab === 1}
	<Settings />
{/if}

<p>
    <select bind:value={$locale}>
      {#each locales as l}
        <option value={l}>{l}</option>
      {/each}
    </select>
</p>


<div class="btm-nav">
	{#each tabs as tab, index}
		<button on:click={() => (activeTab = index)} class:active={index === activeTab}></button>
	{/each}
</div>
