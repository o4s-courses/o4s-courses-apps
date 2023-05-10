"use client"

import { ColorModeScript } from "@chakra-ui/react"
import Provider, { TrpcProvider } from "./providers"

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <head />
      <body>
        <ColorModeScript type="cookie" nonce="testing" />
        <Provider>
					<TrpcProvider>
						<div>
							{children}
						</div>
					</TrpcProvider>
				</Provider>
      </body>
    </html>
  )
}

export default RootLayout
