import { Link } from '@remix-run/react'

interface FeaturedProduct {
	name: string
	price: string
	currency: string
	url: string
	image: {
		name: string
		src: string
		alt: string
	}
}

interface FeaturedProductsProps {
	products: FeaturedProduct[]
}

export function FeaturedProducts(props: FeaturedProductsProps) {
	return (
		<section className="mx-auto max-w-6xl px-4 py-12">
			<header className="mb-10 text-3xl font-medium">I più amati da voi</header>
			<div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 px-8 sm:grid-cols-2 sm:px-0 lg:max-w-full lg:grid-cols-4">
				{props.products.map(p => (
					<article
						key={p.name}
						className="block rounded border-[1px] border-stone-950 bg-white transition-all duration-150 ease-out-quadratic hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#000]"
					>
						<Link to={p.url}>
							<div className="aspect-square w-full bg-black">
								<img
									src={p.image.src}
									alt={p.image.alt}
									aria-label={p.image.name}
									className="rounded-t object-contain"
								/>
							</div>
							<div className="flex items-end border-y-[1px] border-stone-950 px-2">
								<h1 className="flex-1 border-r-[1px] border-stone-950 p-2">
									{p.name}
								</h1>
								<p className="p-2">{`${p.price} ${p.currency}`}</p>
							</div>
						</Link>
					</article>
				))}
			</div>
		</section>
	)
}
