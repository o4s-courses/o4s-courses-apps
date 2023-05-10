"use client"

import { ColorModeScript } from "@chakra-ui/react"
import Provider, { TrpcProvider } from "../providers"
import { i18n } from '../../i18n-config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

async function RootLayout({
  children,
	params,
} : {
  children: React.ReactNode,
	params: { locale: string },
}) {
  return (
    <html lang={params.locale} data-theme="light">
      <head />
      <body>
        <ColorModeScript type="cookie" nonce="testing" />
        <Provider>
					<TrpcProvider>
						
							{children}
					
					</TrpcProvider>
				</Provider>
      </body>
    </html>
  )
}

export default RootLayout
