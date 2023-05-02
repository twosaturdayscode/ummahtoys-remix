import { useMemo, useRef, useState } from 'react'
import { Link, NavLink } from '@remix-run/react'
import { twJoin } from 'tailwind-merge'

import { config } from '~/config'
import { useOnClickOutside } from '~/hooks/use-on-click-outside'

export function Header() {
	const menu = useMemo(() => Object.entries(config.menu), [])

	return (
		<div className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
			<header className="animate-fade-in relative flex w-full shrink-0 flex-col items-center justify-evenly gap-3 border-b-2 border-stone-400 border-opacity-20 bg-orange-50 bg-opacity-80 px-4 py-5 backdrop-blur-md sm:px-8 md:justify-start">
				<Link
					to="/"
					className="flex h-full items-center outline-none transition-colors duration-200 hover:text-stone-600"
					aria-label="Ummahtoys"
				>
					{/* <img
						src="/assets/logo-only.png"
						alt="Logo di Ummah Toys, due pezzi di puzzle insieme"
						className="h-12"
					/> */}
					<span className="ml-3 text-2xl font-bold text-stone-700">
						Halal Land
					</span>
				</Link>

				<div className="z-10 flex h-full items-center justify-center">
					<MenuButton />

					<ul className="hidden w-full justify-around gap-5 md:flex">
						{menu.map(([key, { path, label }]) => (
							<NavItem key={key} to={path} end={path === '/'}>
								<span className="capitalize">{label}</span>
							</NavItem>
						))}
					</ul>
				</div>
			</header>
		</div>
	)
}

interface NavItemProps {
	to: string
	end?: boolean
	children: React.ReactNode
}

function NavItem(props: NavItemProps) {
	return (
		<NavLink
			to={props.to}
			className={({ isActive }) =>
				`text-md relative block w-fit cursor-pointer select-none whitespace-nowrap font-medium text-stone-800 after:absolute after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 ${
					isActive && 'after:scale-x-100'
				}`
			}
			end={props.end}
		>
			{props.children}
		</NavLink>
	)
}

function MenuButton() {
	const [state, setState] = useState<'open' | 'closed'>('closed')
	const toggle = () => setState(s => (s === 'open' ? 'closed' : 'open'))

	const menu = useMemo(() => Object.entries(config.menu), [])
	const ref = useRef(null)

	useOnClickOutside(ref, () => setState('closed'))

	return (
		<div
			ref={ref}
			onClick={toggle}
			className="inline-flex select-none items-center md:hidden"
		>
			<div
				className={twJoin(
					'flex h-10 w-10 items-center justify-center rounded-xl transition duration-200',
					state === 'open' && 'bg-stone-400 bg-opacity-20',
				)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={twJoin(
						'h-5 w-5 stroke-current stroke-[2.5] transition duration-200',
						state === 'open' && 'rotate-90',
					)}
				>
					<path
						d="M3.5 6.5H20.5"
						className={twJoin(
							state == 'open' &&
								'origin-center -translate-x-1 translate-y-1 rotate-45 transition duration-200',
						)}
					/>
					<path
						d="M3.5 17.5H20.5"
						className={twJoin(
							state == 'open' &&
								'origin-center -translate-x-1 -translate-y-1 -rotate-45 transition duration-200',
						)}
					/>
				</svg>
			</div>

			{state === 'open' && (
				<ul className="absolute left-0 right-0 top-16 z-40 mx-3 flex origin-top-right flex-col space-y-0.5 overflow-hidden rounded-xl bg-white px-3.5 py-3 shadow-lg shadow-stone-600/10 before:!content-none">
					{menu.map(([key, { path, label }]) => (
						<NavItem key={key} to={path} end={path === '/'}>
							<span className="capitalize">{label}</span>
						</NavItem>
					))}
				</ul>
			)}
		</div>
	)
}
