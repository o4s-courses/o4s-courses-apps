"use client"

import { api, type RouterOutputs } from "~/utils/api";

import { Link } from "@chakra-ui/next-js"
import { Box, Button, Text, useColorMode } from "@chakra-ui/react"

type course = RouterOutputs["course"]["all"][number]

export default function Page() {
	const userQuery = api.course.all.useQuery()
  const { toggleColorMode } = useColorMode()

  return (
		<>
    <Box textAlign="center" fontSize="xl">
      <Text>Welcome to Chakra UI + Next.js</Text>
      <Link href="#">Go to next</Link>
      <Button onClick={toggleColorMode}>Click me</Button>
    </Box>

			<Box textAlign="center" fontSize="xl">
				{userQuery.data?.map((courses) => (
					<>
					<p>{courses.id}</p>
					<p>{courses.name}</p>
					</>
				))}
      </Box>

		</>
  )
}
