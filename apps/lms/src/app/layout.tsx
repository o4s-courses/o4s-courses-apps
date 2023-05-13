"use client";

import React from "react";

import { type Session } from "@o4s/auth";
import { ColorModeScript } from "@chakra-ui/react";
import Provider, { TrpcProvider, NextAuthProvider } from "./providers";

//import { i18n } from '../../i18n-config'

//export async function generateStaticParams() {
//  return i18n.locales.map((locale) => ({ lang: locale }))
//}

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode,
	params: { session: Session },
}) {
	return (
		<html lang="en" data-theme="light">
			<head />
			<body>
				<ColorModeScript type="cookie" nonce="testing" />
				<Provider>
					{children}
				</Provider>
			</body>
		</html>
	)
}

