"use client"

import { api, type RouterOutputs } from "~/utils/api";

import { Link } from "@chakra-ui/next-js"
import { Box, Button, Text, useColorMode } from "@chakra-ui/react"

export default function Page() {
	const session = api.auth.getSession.useQuery()
  const { toggleColorMode } = useColorMode()

  return (
		<div>
    <Box textAlign="center" fontSize="xl">
      <Text>Welcome to Chakra UI + Next.js</Text>
      <Link href="#">Go to next</Link>
      <Button onClick={toggleColorMode}>Click me</Button>
    </Box>

		<Box textAlign="center" fontSize="xl">
			<Text>Session: {JSON.stringify(session)}</Text>
    </Box>

		</div>
  )
}
