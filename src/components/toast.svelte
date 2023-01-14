<script lang="ts">
	import { toastStore } from '$lib/stores/toast';

	$: toastVisible = Boolean($toastStore);
</script>

<a
	class="toast toast-top toast-center w-9/12"
	class:hidden={!toastVisible}
	target="_blank"
	rel="noreferrer"
	href={$toastStore?.href}
>
	<div class="alert">
		<div>
			<span>{$toastStore?.text}</span>
		</div>
	</div>
</a>
