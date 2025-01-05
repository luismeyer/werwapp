<script lang="ts">
	import { toastStore } from '$lib/stores/toast';

	const toasts = $derived(Object.values($toastStore));
</script>

<div class="toast toast-top toast-center w-9/12 text-center">
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
