import React from "react";

import { Button, Card, CardBody, CardFooter, Heading, Stack, Image, Text } from "@chakra-ui/react";
import { RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["product"]["all"][number]

type Props = {
	key: number;
	product: Product;
}

export default function ProductCard({ key, product }: Props) {
	return (
		<Card
			key={key}
			direction={{ base: 'column', sm: 'row' }}
			overflow='hidden'
			variant='outline'
		>
			<Image
				objectFit='cover'
				maxW={{ base: '100%', sm: '200px' }}
				src={product.image}
				alt={product.name}
			/>

			<Stack>
				<CardBody>
					<Heading size='md'>{product.name}</Heading>

					<Text py='2'>
						{product.description}
					</Text>
				</CardBody>

				<CardFooter>
					<Button variant='solid' colorScheme='blue'>
						ENROLL
					</Button>
				</CardFooter>
			</Stack>
		</Card>
	)
}