import Link from "next/link";

export const Footer = () => {

	const footerNavs = [
			{
					href: '/',
					name: 'Termos'
			},
			{
					href: '/',
					name: 'License'
			},
			{
					href: '/',
					name: 'Privacidade'
			},
			{
					href: '/',
					name: 'Sobre'
			}
	]

	return (
			<footer className="pt-10">
					<div className="max-w-screen-xl mx-auto px-4 text-gray-600 dark:text-gray-300 md:px-8">
							<div className="mt-10 py-10 border-t items-center justify-between sm:flex">
									<p>© 2023 José Cordeiro. Todos os diretos reservados.</p>
									<ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
											{
													footerNavs.map((item, idx) => (
															<li key={idx} className="text-gray-800 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-200 duration-150">
																	<Link href={item.href} >
																			{item.name}
																	</Link>
															</li>
													))
											}
									</ul>
							</div>
					</div>
			</footer>
	)
};