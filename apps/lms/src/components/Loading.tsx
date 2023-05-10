import { Box, CircularProgress } from "@chakra-ui/react";

export default function Loading() {
	return (
		<Box textAlign="center" fontSize="xl">
			<CircularProgress isIndeterminate color='green.300' />
		</Box>
	)
}