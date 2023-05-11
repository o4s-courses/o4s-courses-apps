"use client"

import Loading from "~/components/Loading";
import ProductCard from "~/components/ProductCard";
import { RouterOutputs, api } from "~/utils/api";

type Product = RouterOutputs["product"]["all"][number]

export default function Products() {
	const { data: products, isLoading } = api.product.all.useQuery()

	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			{products?.map((product: Product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</>
	)

}