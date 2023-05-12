"use client";

import React from "react";

import { api, type RouterOutputs } from "~/utils/api";

//import { getDictionary } from '~/utils/get-dictionary'
//import { Locale } from '~/i18n-config'

import { Link } from "@chakra-ui/next-js"
import { Box, Button, Text, useColorMode } from "@chakra-ui/react"
import Loading from "~/components/Loading";

type Course = RouterOutputs["course"]["all"][number]

//export default function DashboardCourses({
//  params: { locale },
//}: {
//  params: { locale: Locale }
//}) {
export default function DashboardCourses() {
	const { data: courses, isLoading } = api.course.all.useQuery()

	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			<Box textAlign="center" fontSize="xl">
				<Text>Welcome to Dashboar Courses</Text>

			</Box>

			<Box textAlign="center" fontSize="xl">
				{courses?.map((course: Course) => (
					<><p>{course.id}</p>
						<p>{course.name}</p></>
				))}
			</Box>
		</>

	)
}