<script lang="ts">
	import { toastStore } from '$lib/stores/toast';
</script>

<div class="toast toast-top toast-center w-9/12">
	{#each $toastStore as toast}
		<a target="_blank" rel="noreferrer" href={toast.href}>
			<div class="alert alert-info">
				<div>
					<span>{toast.text}</span>
				</div>
			</div>
		</a>
	{/each}
</div>
