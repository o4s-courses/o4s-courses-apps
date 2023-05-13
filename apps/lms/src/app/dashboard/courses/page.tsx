"use client";

import React from "react";

import { useSession } from "next-auth/react";
import { api, type RouterOutputs } from "~/utils/api";

//import { getDictionary } from '~/utils/get-dictionary'
//import { Locale } from '~/i18n-config'

import { Link } from "@chakra-ui/next-js"
import { Box, Button, Text, useColorMode } from "@chakra-ui/react"
import Loading from "~/components/Loading";

type Course = RouterOutputs["course"]["all"]

//export default function DashboardCourses({
//  params: { locale },
//}: {
//  params: { locale: Locale }
//}) {
export default function DashboardCourses() {
	const { data: session } = useSession();
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
				<Text>Session: {JSON.stringify(session)}</Text>
				<ul>
					{courses?.map((c) => (
						<li key={c.id}>{c.id} - {c.name}</li>
					))}
				</ul>
			</Box>
		</>

	)
}