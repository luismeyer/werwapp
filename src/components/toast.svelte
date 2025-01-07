<script lang="ts">
	import { toastState } from '$lib/stores/toast.svelte';

	const toasts = $derived(Object.values(toastState));
</script>

<div class="toast toast-bottom toast-center w-9/12 text-center bottom-20">
	{#each toasts as toast}
		{#if 'href' in toast}
			<a target="_blank" rel="noreferrer" href={toast.href}>
				<div class="alert alert-info">
					<div>
						<span>{toast.text}</span>
					</div>
				</div>
			</a>
		{:else}
			<div class="alert alert-error">
				<div>
					<span>{toast.text}</span>
				</div>
			</div>
		{/if}
	{/each}
</div>
