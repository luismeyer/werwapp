<script lang="ts">
	import { i18nStore, t } from '$lib/stores/i18n';
	import { locales } from '$lib/translations/translations';
</script>

<div class="tabs tabs-boxed items-center mb-1">
	{#each locales as l}
		<button
			class="tab flex-1"
			class:tab-active={$i18nStore === l}
			value={l}
			on:click={() => i18nStore.updateLocale(l)}
		>
			{$t(l)}
		</button>
	{/each}
</div>
