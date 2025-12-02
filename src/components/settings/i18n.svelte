<script lang="ts">
import { localeState, locales } from "$lib/stores/i18n.svelte";
import { t } from "$lib/stores/translations.svelte";
</script>

<div class="tabs tabs-box items-center mb-1">
	{#each locales as l}
		<input
			type="radio"
			name={t(l)}
			aria-label={t(l)}
			class="tab flex-1"
			checked={localeState.locale === l}
			onmousedown={() => (localeState.locale = l)}
	/>
	{/each}
</div>

