import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import WindiCSS from 'vite-plugin-windicss'


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
    adapter: adapter({
			pages: 'build',
			assets: 'build',
      fallback: 'index.html'
		}),
    paths: {
			base: '/digi-db',
		},
		// If you are not using a .nojekyll file, change your appDir to something not starting with an underscore.
		// For example, instead of '_app', use 'app_', 'internal', etc.
		appDir: 'internal',
    vite: {
      plugins: [
        WindiCSS(),
      ],
    },
	}
};

export default config;
