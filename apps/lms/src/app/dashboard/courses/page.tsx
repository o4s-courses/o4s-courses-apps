"use client";

import { api, type RouterOutputs } from "~/utils/api";

import { Link } from "@chakra-ui/next-js"
import { Box, Button, Text, useColorMode } from "@chakra-ui/react"

type course = RouterOutputs["course"]["all"][number]

export default function DashboardCourses() {
	const userQuery = api.course.all.useQuery()
  
  return (
		<>
    <Box textAlign="center" fontSize="xl">
      <Text>Welcome to Dashboar Courses</Text>

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