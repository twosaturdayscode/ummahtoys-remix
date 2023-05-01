import { head } from 'pratica'
import type {
	CommerceService,
	PaginationOptions,
	Product,
} from 'services/commerce/concepts'
import type {
	PublishedWooCommerceProduct,
	WooCommerceProduct,
} from 'services/commerce/woocommerce/types'

interface WooCommerceAuthKeys {
	consumerKey: string
	consumerSecret: string
}

function byStatus(status: WooCommerceProduct['status']) {
	return (p: WooCommerceProduct): p is PublishedWooCommerceProduct =>
		p.status === status
}

function toProduct(p: WooCommerceProduct): Product {
	return {
		id: p.id,
		description: p.description,
		name: p.name,
		slug: p.slug,
		price: {
			value: parseFloat(p.price),
			amount: p.price,
			currency: '€',
		},
		images: p.images,
	}
}

const FEATURED_PRODUCTS_NUMBER = 4
const productsEndpoint = 'products'

export class WooCommerceService implements CommerceService {
	/** Just a configured fetch to have auth headers for each call */
	private fetcher

	constructor(private baseUrl: string, private keys: WooCommerceAuthKeys) {
		const encodedKeys = btoa(
			`${this.keys.consumerKey}:${this.keys.consumerSecret}`,
		)

		this.fetcher = <T>(
			endpoint: string | Request,
			requestInit?: RequestInit | Request,
		) =>
			fetch(`${this.baseUrl}/wp-json/wc/v3/${endpoint}`, {
				...requestInit,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Basic ${encodedKeys}`,
					...requestInit?.headers,
				},
			}).then(r => r.json<T>())
	}

	findProducts = async (opts?: PaginationOptions): Promise<Product[]> => {
		const queries = new URLSearchParams()

		if (opts?.page != null) {
			queries.append('page', opts.page.toString())
		}

		if (opts?.size != null) {
			queries.append('per_page', opts.size.toString())
		}

		const queryString = queries.toString() ? `?${queries.toString()}` : ''

		const wooProducts = await this.fetcher<WooCommerceProduct[]>(
			`${productsEndpoint}${queryString}`,
		)

		return wooProducts.filter(byStatus('publish')).map(toProduct)
	}

	findProductBySlug = async (slug: string): Promise<Product> => {
		const wooProducts = await this.fetcher<WooCommerceProduct[]>(
			`${productsEndpoint}?slug=${slug}`,
		)

		return head(wooProducts.filter(byStatus('publish')).map(toProduct)).cata({
			Just: p => p,
			Nothing: () => {
				throw Error(`No product with slug "${slug}" have been found`)
			},
		})
	}

	findFeaturedProducts = async (): Promise<Product[] | undefined> => {
		const featuredWooProducts = await this.fetcher<WooCommerceProduct[]>(
			`${productsEndpoint}?featured=true`,
		)

		console.log(featuredWooProducts)

		const areFeaturedProductsEnough =
			featuredWooProducts.length >= FEATURED_PRODUCTS_NUMBER

		if (areFeaturedProductsEnough) {
			return featuredWooProducts
				.slice(0, FEATURED_PRODUCTS_NUMBER)
				.map(toProduct)
		}

		console.error(
			`Featured products are not enough. Should be at least ${FEATURED_PRODUCTS_NUMBER}`,
		)

		return undefined
	}
}
