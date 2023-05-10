"use client"

import { api, type RouterOutputs } from "~/utils/api";

//import { getDictionary } from '~/utils/get-dictionary'
//import { Locale } from '~/i18n-config'

import { Link } from "@chakra-ui/next-js"
import { Box, Button, Text, useColorMode } from "@chakra-ui/react"

//export default async function Page({
//  params: { locale },
//}: {
//  params: { locale: Locale }
//}) {
export default function Page() {
	const session = api.auth.getSession.useQuery()
	const { toggleColorMode } = useColorMode()

	//const dictionary = await getDictionary(locale)

	return (
		<div>
			<Box textAlign="center" fontSize="xl">
				<Text>Olá  <strong>José</strong></Text>
				<Text>...</Text>
				<Link href="#">Go to next</Link>
				<Button onClick={toggleColorMode}>Click me</Button>

			</Box>

			<Box textAlign="center" fontSize="xl">
				<Text>Session: {JSON.stringify(session)}</Text>
			</Box>

		</div>
	)
}
