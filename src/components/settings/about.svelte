<script lang="ts">
	import { t } from '$lib/stores/translations.svelte';
	import { Licenses } from '../../const/licenses';

	const formatLink = (link: string): string => {
		const columIndex = link.indexOf(':');
		const lastDot = link.lastIndexOf('.');

		return `https${link.substring(columIndex, lastDot)}`;
	};
</script>

<div class="flex flex-col gap-5">
	<h3 class="text-lg font-bold">{t('about.title')}</h3>

	<a
		target="_blank"
		rel="noreferrer"
		href="https://www.github.com/BjarneRentz/werwapp"
		class="link"
	>
		{t('about.github')}
	</a>

	<div>
		<h4 class="mb-1">{t('about.licenses.title')}</h4>

		<div class="overflow-y-scroll overflow-x-hidden flex flex-col gap-8 max-h-64">
			{#each Licenses as license}
				<div class="card bg-neutral shadow-xl">
					<div class="card-body">
						<h2 class="card-title">{license.name}</h2>

						<p>
							{t('about.licenses.description', {
								author: license.author,
								licenseType: license.licenseType
							})}
						</p>

						<div class="card-actions justify-end">
							<a
								target="_blank"
								rel="noreferrer"
								href={formatLink(license.link)}
								class="btn btn-primary"
							>
								{t('about.licenses.project')}
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
