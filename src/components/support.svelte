<script lang="ts">
	import { afterUpdate } from 'svelte';

	import { findAnswer } from '$lib/support';
	import { i18nStore, t } from '$lib/stores/i18n';

	let inputValue: string;

	let bubbleContainer: HTMLDivElement;

	$: bubbles = [{ left: true, text: $t('support.welcome') }];

	let disabled = false;

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.code !== 'Enter') {
			return;
		}

		addQuestion();
	};

	const addQuestion = () => {
		disabled = true;

		const parsedInput = inputValue.toLowerCase();

		bubbles = [...bubbles, { left: false, text: inputValue }];
		inputValue = '';

		const answer = findAnswer(parsedInput, $i18nStore);
		bubbles = [...bubbles, { left: true, text: $t(answer) }];

		disabled = false;
	};

	afterUpdate(() => {
		bubbleContainer.scroll({ top: bubbleContainer.scrollHeight, behavior: 'smooth' });
	});
</script>

<h3 class="text-lg font-bold pb-5">{$t('support.headline')}</h3>

<div bind:this={bubbleContainer} class="overflow-y-scroll">
	<!-- this is a needed hack because otherwise the styles aren't loaded correctly -->
	<div class="chat-start chat-end" />

	{#each bubbles as bubble}
		<div class={`chat chat-${bubble.left ? 'start' : 'end'}`}>
			<div class="chat-bubble">{bubble.text}</div>
		</div>
	{/each}
</div>

<div class="flex items-center mt-5 gap-2">
	<input
		{disabled}
		type="text"
		placeholder="What's up?"
		class="input w-full"
		bind:value={inputValue}
		on:keypress={onKeyPress}
	/>

	<button on:click={addQuestion} {disabled} class="btn">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="hsl(var(--nc) / var(--tw-text-opacity))"
		>
			<path
				d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"
			/>
		</svg>
	</button>
</div>
