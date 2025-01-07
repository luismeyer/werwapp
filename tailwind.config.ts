import type { Config } from 'tailwindcss';
import { Themes } from './src/const/themes';

import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [daisyui],
	daisyui: {
		themes: Themes
	}
} satisfies Config;
