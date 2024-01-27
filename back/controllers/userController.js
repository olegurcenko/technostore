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
			return res.status(400).json({
				message: 'Invalid login or password'
			})
		}

		const token = jwt.sign({
			_id: user._id
		},
		'secret123',
		{
			//expiresIn: '30d'
		})

		const {passwordHash, ...userData} = user._doc

		//res.header("Authorization", `${token}`)

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

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId)
		if (!user) {
			return res.status(404).json({
				message: 'user not found, idi nahuy'
			})
		}

		const {passwordHash, ...userData} = user._doc

		res.json(userData)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'access denied'
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

export const removeItem = async (req, res) => {
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

		if (prodId === 'all')
		{
			user.activePreorderedItems = []
		} else {

			
			const product = await ProductModel.findOne({
				_id: prodId
			})
			
			if (!product) {
				return res.status(404).json({
				message: 'Cannot find product'
			})
		}
		
		let listFinal = [];
		
		let deleted = true;
		
		listFinal = user.activePreorderedItems.filter(function( obj ) {
			if (deleted){
				if (obj._id.toString() == prodId)
				{
					deleted = false;
					return false;
				} else {
					return true
				}
			} else {
				return true
			}
		});
		
		user.activePreorderedItems = listFinal;
	}
		user.save();
		res.json({
			//list: listFinal.length,
			success: true
		})

	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'User or product not found'
		})
	}
}

export const getOrders = async (req, res) => {
	try {
		const token = req.headers['authorization']

		if (!token) {
			res.status(500).json({
				message: "You are not authorized"
			})
		}

		const decoded = jwt.verify(token, 'secret123')

		const user = await UserModel.findOne({
			_id: decoded._id
		})

		const ordersEmail = user.email

		const orders = await OrderModel.find({
			email: ordersEmail
		})

		res.json(orders)
		
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: "Error while getting orders"
		})
	}
}

export const createOrder = async (req, res) => {
	try {
		const token = req.headers["authorization"]

		if (!token){
			console.log('no token')
		}

		const decoded = jwt.verify(token, 'secret123')

		const user = await UserModel.findOne({
			_id: decoded._id
		})

		if (!user) {
			return res.status(404).json({
				message: 'Cannot find user'
			})
		}
		let adress
		if (user.adress)
		{
			adress = user.adress
		} else {
			adress = req.body.adress
		}
		

		const order = new OrderModel({
			name: user.fullName,
			adress: adress,
			email: user.email,
			items: user.activePreorderedItems
		})

		const savedOrder = await order.save()

		user.activePreorderedItems = []

		await user.save()

		res.json(savedOrder)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: "Order wasnt created"
		})
	}
}