import React from "react";
import axios from '../../axios'
import { ProductCard } from "../../components/main/productCard/ProductCard";
import { useParams } from 'react-router-dom'

export const ProductPage = () => {
	const [data, setData] = React.useState()
	const [isLoading, setLoading] = React.useState(true)
	const {id} = useParams()

	React.useEffect(() => {
		axios
			.get(`/product/${id}`)
			.then((res) => {
				setData(res.data)
				console.log(res)
				setLoading(false)
			})

			.catch((err) => {
				console.warn(err)
			})
	}, [])

	if (isLoading) {
		return <ProductCard isLoading={isLoading}/>
	}

	return <ProductCard
	//type='link'
	id={data.id}
	title={data.title}
	brand={data.brand}
	product_type={data.product_type}
	short_description={data.short_description}
	long_description={data.long_description}
	parameters={data.parameters}
	price={data.price}
	//reviews={obj.reviews}
	/>
}