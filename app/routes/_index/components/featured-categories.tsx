export function FeaturedCategories() {
	return (
		<section className="mx-auto max-w-6xl px-4 py-12">
			<header className="mb-10 text-3xl font-medium">
				Le categorie più frequentate
			</header>
			<div className="mx-auto grid grid-cols-1 gap-y-4 p-8 sm:grid-cols-3 sm:gap-20">
				<div className="col-span-2 block aspect-square w-full rounded border-2 border-stone-950 bg-orange-600 transition-all duration-150 ease-out-quadratic hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#000]"></div>
				<div className="flex h-full w-full flex-col justify-center gap-20">
					<div className="aspect-square w-full border-2 border-stone-950 bg-violet-600"></div>
					<div className="aspect-square w-full border-2 border-stone-950 bg-green-600"></div>
				</div>
			</div>
		</section>
	)
}
