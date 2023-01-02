export const SITE = {
	name: 'FutureSea',

	origin: 'https://futuresea.eu',
	basePathname: '/',
	trailingSlash: false,

	title: 'More budućnosti…',
	description: '…je projekt koji za cilj ima prijenos znanja i jačanje svijesti o važnosti oceana za život na Zemlji kod djece školskog uzrasta. Projekt je sufinanciran sredstvima Zaklade Adris kroz Program Stvaralaštvo, ekologija, baština i dobrota, a provodi ga Institut za oceanografiju i ribarstvo. ',

	googleAnalyticsId: false, // or "G-51MGD17LC3",
	googleSiteVerificationId: 'orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M',
};

export const BLOG = {
	disabled: false,
	postsPerPage: 4,

	blog: {
		disabled: false,
		pathname: 'blog', // blog main path, you can change this to "articles" (/articles)
	},

	post: {
		disabled: false,
		pathname: '', // empty for /some-post, value for /pathname/some-post
	},

	category: {
		disabled: false,
		pathname: 'category', // set empty to change from /category/some-category to /some-category
	},

	tag: {
		disabled: false,
		pathname: 'tag', // set empty to change from /tag/some-tag to /some-tag
	},
};
