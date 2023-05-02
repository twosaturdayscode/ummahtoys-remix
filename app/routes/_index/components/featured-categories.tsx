import { Link } from '@remix-run/react'

type CategoryImage = {
	src: string
	name: string
	alt: string
}

type Category = {
	name: string
	image: CategoryImage
	description: string
	url: string
}

interface FeaturedCategoriesProps {
	categories: Category[]
}

export function FeaturedCategories(props: FeaturedCategoriesProps) {
	const { categories } = props

	return (
		<section className="mx-auto max-w-7xl px-4 py-12">
			<header className="mb-10 text-3xl font-medium">
				Le categorie più frequentate
			</header>
			<div className="mx-auto grid grid-cols-1 grid-rows-[auto] items-stretch justify-stretch gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-20">
				{categories.map(c => (
					<article
						key={c.name}
						className="block rounded border-[1px] border-stone-950 bg-white transition-all duration-150 ease-out-quadratic hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#000]"
					>
						<Link to={c.url}>
							<div className="flex flex-col gap-3 px-7 py-8">
								<div>
									<img
										src={c.image.src}
										alt={c.image.alt}
										aria-label={c.image.name}
										className="h-16"
									/>
								</div>
								<h1 className="text-4xl font-medium capitalize">{c.name}</h1>
								<p className="text-lg capitalize">{c.description}</p>
							</div>
						</Link>
					</article>
				))}
			</div>
		</section>
	)
}
