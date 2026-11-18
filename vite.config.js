import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vite';

// SvelteKit 3 takes its config here (svelte.config.js is no longer used) and
// its own options sit at the top level (no `kit` namespace).
export default defineConfig(async () => ({
  plugins: [
    await sveltekit({
      preprocess: vitePreprocess(),
      // Full static-site generation: every route prerendered to HTML.
      adapter: adapter({
        pages: 'build',
        assets: 'build',
        fallback: undefined,
        precompress: false,
        strict: true
      }),
      // GitHub Pages project sites are served from https://<user>.github.io/<repo>/,
      // so everything must be prefixed with that sub-path. Set BASE_PATH at build
      // time (the deploy workflow sets it to "/<repo>"). Empty for `vite dev` and
      // for root/custom-domain hosting. Links/assets pick this up automatically via
      // %sveltekit.assets% and `base` from '$app/paths'.
      paths: {
        base: /** @type {'' | `/${string}`} */ (
          process.argv.includes('dev') ? '' : (process.env.BASE_PATH ?? '')
        )
      }
    })
  ]
}));
