<script lang="ts">
	import { localeState, locales } from '$lib/stores/i18n.svelte';
	import { t } from '$lib/stores/translations.svelte';
</script>

<div class="tabs tabs-boxed items-center mb-1">
	{#each locales as l}
		<button
			class="tab flex-1"
			class:tab-active={localeState.locale === l}
			value={l}
			onmousedown={() => (localeState.locale = l)}
		>
			{t(l)}
		</button>
	{/each}
</div>
