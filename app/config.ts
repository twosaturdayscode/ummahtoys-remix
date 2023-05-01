export const config = {
	menu: {
		home: {
			label: 'home',
			path: '/',
		},
		shop: {
			label: 'shop',
			path: 'shop',
		},
		about: {
			label: 'Chi siamo',
			path: '/chi-siamo',
		},
	},
}

interface CommonCacheControlOptions {
	'max-age': number
	's-maxage': number
	'swr': number
}

export const CommonCacheControl = ({
	'max-age': maxage = 60 * 10, // Browser cache 10 minutes
	's-maxage': smaxage = 60 * 60 * 24, // CDN cache 1 day
	swr = 60 * 60 * 24 * 30 * 12, // SWR 1 year
}: CommonCacheControlOptions) => ({
	'Cache-Control': `public, max-age=${maxage}, s-maxage=${smaxage}, stale-while-revalidate=${swr}`,
})
