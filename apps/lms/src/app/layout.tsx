"use client"

import { ColorModeScript } from "@chakra-ui/react"
import Provider, { TrpcProvider, NextAuthProvider } from "./providers"
//import { i18n } from '../../i18n-config'

//export async function generateStaticParams() {
//  return i18n.locales.map((locale) => ({ lang: locale }))
//}

export default function RootLayout({
	children,
	//params,
}: {
	children: React.ReactNode,
	//params: { locale: string },
}) {
	return (
		<html lang="en" data-theme="light">
			<head />
			<body>
				<NextAuthProvider>
					<ColorModeScript type="cookie" nonce="testing" />
					<Provider>
						<TrpcProvider>

							{children}

						</TrpcProvider>
					</Provider>
				</NextAuthProvider>
			</body>
		</html>
	)
}

