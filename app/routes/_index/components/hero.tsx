import { Link } from '@remix-run/react'

export function Hero() {
	return (
		<section className="mx-auto max-w-6xl px-8 py-5">
			<div className="flex flex-col-reverse gap-5 md:flex-row">
				<div className="flex flex-col gap-6 text-center md:justify-center md:text-left">
					<h1 className="text-4xl font-semibold text-zinc-900 lg:text-6xl">
						Il tuo negozio online di giochi per bambini musulmani
					</h1>
					<p className="text-xl text-gray-800">
						Il primo negozio online in Italia di giochi islamici per insegnare
						l’Islam agli eroi di domani, perché imparare divertendosi si può!
					</p>
					<div className="flex w-full flex-col-reverse items-center justify-center gap-5 md:flex-row md:justify-start lg:text-xl">
						<Link
							to="/negozio"
							className="rounded-full border-[1px] border-stone-950 bg-stone-900 px-3 py-2 text-white transition-all duration-150 ease-out-quadratic hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#000]"
						>
							Val al negozio
						</Link>
						<Link
							to="/chi-siamo"
							className="rounded-full border-[1px] border-stone-950 bg-white px-3 py-2 transition-all duration-150 ease-out-quadratic hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#000]"
						>
							Scopri chi siamo
						</Link>
					</div>
				</div>
				<div className="flex h-56 w-full items-center justify-center lg:h-96">
					<img
						src="/assets/hero-mom.svg"
						alt="Una mamma che legge un libro al suo bambino"
						className="h-full drop-shadow"
					/>
				</div>
			</div>
		</section>
	)
}
