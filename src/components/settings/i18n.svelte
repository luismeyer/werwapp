<script lang="ts">
	import { localeStore, locales } from '$lib/stores/i18n';
	import { t } from '$lib/stores/translations';
</script>

<div class="tabs tabs-boxed items-center mb-1">
	{#each locales as l}
		<button
			class="tab flex-1"
			class:tab-active={$localeStore === l}
			value={l}
			onclick={() => localeStore.updateLocale(l)}
		>
			{$t(l)}
		</button>
	{/each}
</div>
