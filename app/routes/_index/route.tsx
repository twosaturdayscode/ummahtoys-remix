import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { encase } from 'pratica'

import { Hero } from './components/hero'
import { config } from '~/config'
import { FeaturedCategories } from '~/routes/_index/components/featured-categories'
import { FeaturedProducts } from '~/routes/_index/components/featured-products'

export const loader = async ({ context }: LoaderArgs) => {
	const { services } = context

	const featured = await services.woocommerce.findFeaturedProducts()

	return json({
		featured,
	})
}

export default function IndexLayout() {
	const { featured } = useLoaderData<typeof loader>()

	return (
		<main className="bg-orange-50">
			<Hero />

			<div className="w-full border-y-2 border-stone-950 py-12 text-center">
				<div className="mx-auto flex max-w-5xl flex-col items-center justify-center">
					<h2 className="mb-5 text-4xl font-medium text-stone-950">
						Il nostro obiettivo è fornire ai genitori risorse islamiche di
						qualità che trasmettano i valori musulmani ai bambini di oggi.
					</h2>
					<p className="text-lg text-stone-700">
						Vogliamo essere il punto di riferimento per qualsiasi tipo di
						materiale educativo e ricreativo per i bambini musulmani in Italia.
						Che tu abbia bisogno di un semplice gioco o un libro approfondito
						noi ci siamo.
					</p>
				</div>
			</div>

			{/* <section className="w-full border-b-2 border-stone-950">
				<div className="grid grid-cols-2 gap-0">
					<div className="flex min-h-[22rem] w-full items-center justify-center border-r-2 border-stone-950 bg-violet-400 p-5 text-center">
						<span className="text-5xl">Abbiamo un solo obiettivo</span>
					</div>
					<div className="flex min-h-[22rem] w-full items-center justify-center bg-orange-400 p-5 text-center">
						<span className="text-5xl">
							Aiutarti a crescere tuo figlio nei migliori dei modi
						</span>
					</div>
				</div>
			</section> */}

			{featured && (
				<FeaturedProducts
					products={featured.map(f => ({
						name: f.name,
						price: f.price.amount,
						currency: f.price.currency,
						url: `${config.menu['shop']}/${f.slug}`,
						image: f.images[0],
					}))}
				/>
			)}

			<section className="my-16 flex h-72 w-full flex-row items-center justify-end border-y-2 border-stone-950 bg-[#F58466] px-10 text-white">
				<div className="absolute left-5 hidden w-20 md:block md:w-44 lg:left-16 lg:w-80">
					<img
						src={'/assets/jumbotron-dad.svg'}
						alt="Un papà che prega con um bambino sopra le spalle"
						className="h-full"
					/>
				</div>
				<p className="w-full pl-0 text-2xl font-bold md:pl-44 md:text-3xl lg:pl-96 lg:text-4xl">
					Un bambino musulmano cresce padroneggiando la vita, con il mondo nelle
					sue mani e la fede nel suo cuore.
					<br />
					<span className="pl-8 text-base"> - Ummah Toys</span>
				</p>
			</section>

			<FeaturedCategories />
		</main>
	)
}
