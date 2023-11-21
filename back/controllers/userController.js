import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/user.js'
import ProductModel from '../models/product.js'
import OrderModel from '../models/orders.js'

export const register = async (req, res) => {
	try {
		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)


		const doc = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			password: req.body.password,
			passwordHash: hash
		})

		const user = await doc.save()

		const token = jwt.sign({
			_id: user._id,
		},
		'secret123',
		{
			expiresIn: '30d'
		})

		const {passwordHash, ...userData} = user._doc

		res.header("Authorization", `${token}`)

		res.json({
			...userData,
			token,
		})

	} catch(err) {
		console.log(err)
		res.status(500).json({
			message: 'Registration gone wrong'
		})
	}
}

export const login = async(req, res) => {
	try {
		const user = await UserModel.findOne({
			email: req.body.email
		})

		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			})
		}

		const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

		if (!isValidPass) {
			return res.status(400).sjon({
				message: 'Invalid login or password'
			})
		}

		const token = jwt.sign({
			_id: user._id
		},
		'secret123',
		{
			expiresIn: '30d'
		})

		const {passwordHash, ...userData} = user._doc

		res.header("Authorization", `${token}`)

		res.json({
			...userData,
			token
		})

	} catch(err) {
		console.log(err)
		res.status(500).json({
			message: 'Login went wrong'
		})
	}
}

export const addItem = async (req, res) => {
	try {
		const token = req.headers["authorization"]

		const decoded = jwt.verify(token, 'secret123')

		const user = await UserModel.findOne({
			_id: decoded._id
		})

		if (!user) {
			return res.status(404).json({
				message: 'Cannot find user'
			})
		}

		const prodId = req.params.id

		console.log(req.params)

		const product = await ProductModel.findOne({
			_id: prodId
		})

		if (!product) {
			return res.status(404).json({
				message: 'Cannot find product'
			})
		}

		user.activePreorderedItems.push(product)

		user.save()

		res.json({
			success: true
		})

	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'User or product not found'
		})
	}
}

export const createOrder = async (req, res) => {
	try {
		const token = req.headers["authorization"]

		const decoded = jwt.verify(token, 'secret123')

		const user = await UserModel.findOne({
			_id: decoded._id
		})

		if (!user) {
			return res.status(404).json({
				message: 'Cannot find user'
			})
		}

		let address = user.address

		if (!address) {
			address = req.body.address

			if (!address) {
				return res.status(404).json({
					message: 'Add your adress'
				})
			}
		}
		

		const order = new OrderModel({
			name: user.fullName,
			adress: address,
			email: user.email,
			items: user.activePreorderedItems
		})

		const savedOrder = await order.save()

		res.json(savedOrder)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: "Order didnt create"
		})
	}
}