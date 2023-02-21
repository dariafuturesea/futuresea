import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import NetlifyCMS from 'astro-netlify-cms';

import { remarkReadingTime } from './src/utils/frontmatter.mjs';
import { SITE } from './src/config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const whenExternalScripts = (items = []) =>
	SITE.googleAnalyticsId ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
	site: SITE.origin,
	base: SITE.basePathname,
	trailingSlash: SITE.trailingSlash ? 'always' : 'never',

	output: 'static',

	integrations: [
		NetlifyCMS({
            config: {
              backend: {
                name: 'git-gateway',
                repo: 'dariafuturesea/futuresea',
                branch: 'main',
              },
              media_folder: 'public/images',
              public_folder: '/images',
              publish_mode: 'editorial_workflow',
              collections: [
                {
                  name: 'posts',
                  label: 'Posts',
                  label_singular: 'Post',
                  folder: 'src/pages/posts',
                  create: true,
                  delete: true,
                  fields: [
					{
						name: 'publishDate',
						widget: 'datetime',
						format: 'YYYY-MM-DDTHH:mm:ssZ',
						date_format: 'DD MMM YYYY',
						time_format: false,
						label: 'Publish Date',
					},
                    { name: 'title', widget: 'string', label: 'Post Title' },
                    { name: 'description', widget: 'string', label: 'Description', required: false },
					{ name: 'image', widget: 'image', choose_url: true, label: 'Image', default: false },
					{ name: 'category', widget: 'list', label: 'Category', default: false },
					{ name: 'tags', widget: 'list', label: 'Tags', default: false },
                    { name: 'canonical', widget: 'string', label: 'Slug', default: false },
                    { name: 'body', widget: 'markdown', label: 'Post Body' },
                  ],
              	}],
			},
		}),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		sitemap(),
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
		}),
		mdx(),

		...whenExternalScripts(() =>
			partytown({
				config: { forward: ['dataLayer.push'] },
			})
		),
	],

	markdown: {
		remarkPlugins: [remarkReadingTime],
		extendDefaultPlugins: true,
	},

	vite: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
	},
});
