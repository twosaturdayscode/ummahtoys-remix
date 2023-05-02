type ProductPrice = {
	/** String representation of the value i.e 21.50 */
	amount: string
	/** Mathematical value of the price i.e 21.5 */
	value: number
	/** Currency, not managed yet */
	currency: '€'
}

type Image = {
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
	images: Image[]
}

export type TopCategory = {
	id: string
	name: string
	description: string
	slug: string
	image: Image
	level: 'top' // Indicates that it's a top-level categorys
}

export type SubCategory = {
	id: string
	name: string
	description: string
	slug: string
	image: Image
	level: 'sub' // Indicates that it's a subcategory
	/** The id of the parent category */
	parentId: string
}

export type Category = TopCategory | SubCategory

export interface PaginationOptions {
	page?: number
	size?: number
}

export interface CommerceService {
	/** Queries */
	findProducts(opts?: PaginationOptions): Promise<Product[]>
	findProductBySlug(slug: string): Promise<Product>
	findFeaturedProducts(): Promise<Product[] | undefined>
	findProductsCategories(level: 'top' | 'all'): Promise<Category[]>
}
