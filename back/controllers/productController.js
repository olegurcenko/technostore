import productModel from '../models/product.js'

export const getAll = async (req, res) => {
	try {
		const products = await productModel.find()

		res.json(products)
	} catch(err) {
		console.log(err)
		res.status(500).json({
			message: 'Cant get products'
		})
	}
}

export const getByType = async (req, res) => {
	try {
		const type = req.params.type

		const products = await productModel.find(
			{
				product_type: type,
			}
		)

		if (products.length > 0) {
			res.json(products)
		} else {
			res.status(500).json({
				message: 'Cant get products'
			})
		}

	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Cant get products'
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const prodId = req.params.id

		const returnedProd = await productModel.findOne(
			{
				_id: prodId,
			}
		)
		if (returnedProd) {
			res.json(returnedProd)
		} else {
			return res.status(404).json({
				message: 'Cant find this product'
			})
		}
	} catch(err) {
		console.log(err)
		res.status(500).json({
			message: 'Cannot get product'
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new productModel({
			title: req.body.title,
			brand: req.body.brand,
			product_type: req.body.product_type,
			short_description: req.body.short_description,
			long_description: req.body.long_description,
			price: req.body.price
		})

		const product = await doc.save()

		res.json(product)
	} catch(err) {
		console.log(err)
		res.status(500).json({
			message: 'Creation failed'
		})
	}
}

export const remove = async (req, res) => {
	try {
		const prodId = req.params.id;

		const deletedProduct = await productModel.findByIdAndDelete(
			{_id: prodId},
		)

		if (!deletedProduct) {
			return res.ststus(404).json({
				message: 'Cannot find product'
			})
		}

		res.json({
			success: true
		})
	} catch(err) {
		console.log(err)
		res.status(500).json({
			message: 'Cannot delete this product'
		})
	}
}

export const update = async (req, res) => {
	try {
		const prodId = req.params.id

		await productModel.updateOne({
			_id: prodId,
		},
		{
			title: req.body.title,
			brand: req.body.brand,
			product_type: req.body.product_type,
			short_description: req.body.short_description,
			long_description: req.body.long_description,
			price: req.body.price,
			images: req.body.imgeUrl
		})

		res.json({
			success: true
		})
	} catch (err) {
		console.log(err)
		//console.log(req.body)
		res.status(500).json({
			message: 'cant update post'
		})
	}
}