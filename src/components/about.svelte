<script lang="ts">
	import type { License } from '$lib/license';

	async function loadLicenses() {
		const response = await fetch('/licenses.json');
		const licenses = (await response.json()) as License[];

		console.log(licenses);

		return licenses;
	}

	let loadLicensesPromise = loadLicenses();

	const formatLink = (link: string): string => {
		const columIndex = link.indexOf(':');
		const endDot = link.lastIndexOf('.');

		const correctLink = 'https' + link.substring(columIndex, endDot);
		console.log(correctLink);
		return correctLink;
	};
</script>

<h3>Über Werwapp</h3>
<a target="_blank" rel="noreferrer" href="https://www.github.com/BjarneRentz/werwapp" class="link"
	>Hier findest du uns bei Github!</a
>

<h4>Lizenzen</h4>

{#await loadLicensesPromise}
	<p>Lade Lizenzen</p>
{:then licenses}
	<div class="overflow-y-scroll flex flex-col gap-8">
		{#each licenses as license}
			<div class="card bg-neutral shadow-xl">
				<div class="card-body">
					<h2 class="card-title">{license.name}</h2>
					<p>From {license.author} with an {license.licenseType} License.</p>
					<div class="card-actions justify-end">
						<a
							target="_blank"
							rel="noreferrer"
							href={formatLink(license.link)}
							class="btn btn-primary">Project</a
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/await}
