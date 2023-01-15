<script lang="ts">
	import type { License } from '$lib/license';
	import { t } from '$lib/stores/i18n';

	async function loadLicenses() {
		const response = await fetch('/licenses.json');
		return (await response.json()) as License[];
	}

	let loadLicensesPromise = loadLicenses();

	const formatLink = (link: string): string => {
		const columIndex = link.indexOf(':');
		const lastDot = link.lastIndexOf('.');

		return 'https' + link.substring(columIndex, lastDot);
	};
</script>

<h3>{$t('about.title')}</h3>
<a target="_blank" rel="noreferrer" href="https://www.github.com/BjarneRentz/werwapp" class="link"
	>{$t('about.github')}</a
>

<h4>{$t('about.licenses.title')}</h4>

{#await loadLicensesPromise}
	<p>{$t('about.licenses.loading')}</p>
{:then licenses}
	<div class="overflow-y-scroll flex flex-col gap-8">
		{#each licenses as license}
			<div class="card bg-neutral shadow-xl">
				<div class="card-body">
					<h2 class="card-title">{license.name}</h2>
					<p>
						{$t('about.licenses.description', {
							author: license.author,
							licenseType: license.licenseType
						})}
					</p>
					<div class="card-actions justify-end">
						<a
							target="_blank"
							rel="noreferrer"
							href={formatLink(license.link)}
							class="btn btn-primary">{$t('about.licenses.project')}</a
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/await}
