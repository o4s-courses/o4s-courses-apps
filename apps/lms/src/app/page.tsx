"use client"

import React from "react";
import { useSession } from "next-auth/react"
import { api, type RouterOutputs } from "~/utils/api"

import { getCookie, getCookies } from "typescript-cookie";
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
	const { data: session } = useSession()
	const { toggleColorMode } = useColorMode()

	const cookies = getCookies()

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
				<Text>Cookies: {JSON.stringify(cookies)}</Text>
			</Box>

		</div>
	)
}
