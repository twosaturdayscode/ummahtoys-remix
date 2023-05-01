type ProductPrice = {
	/** String representation of the value i.e 21.50 */
	amount: string
	/** Mathematical value of the price i.e 21.5 */
	value: number
	/** Currency, not managed yet */
	currency: '€'
}

type ProductImage = {
	id: string
	src: string
	name: string
	alt: string
}

export type Product = {
	id: string
	name: string
	description: string
	slug: string
	price: ProductPrice
	images: ProductImage[]
}

export interface PaginationOptions {
	page?: number
	size?: number
}

export interface CommerceService {
	/** Queries */
	findProducts(opts?: PaginationOptions): Promise<Product[]>
	findProductBySlug(slug: string): Promise<Product>
	findFeaturedProducts(): Promise<Product[] | undefined>
}
