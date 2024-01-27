import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import AdminModel from '../models/admin.js'
import OrderModel from '../models/orders.js'
import UserModel from '../models/user.js'

export const register = async (req, res) => {
	try {
		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const doc = new AdminModel({
			email: req.body.email,
			fullName: req.body.fullName,
			password: req.body.password,
			passwordHash: hash
		})

		const admin = await doc.save()

		const token = jwt.sign({
			_id: admin._id,
		},
		'secret123',
		{
			expiresIn: '3d'
		})

		const {passwordHash, ...adminData} = admin._doc

		res.header("Authorization", `${token}`)

		res.json({
			...adminData,
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
		const admin = await AdminModel.findOne({
			email: req.body.email
		})

		if (!admin) {
			return res.status(404).json({
				message: 'Admin not found'
			})
		}

		const isValidPass = await bcrypt.compare(req.body.password, admin._doc.passwordHash)

		if (!isValidPass) {
			return res.status(400).json({
				message: 'Invalid login or password'
			})
		}

		const token = jwt.sign({
			_id: admin._id
		},
		'secret123',
		{
			expiresIn: '30d'
		})

		const {passwordHash, ...adminData} = admin._doc

		res.header("authorization", `${token}`)

		res.json({
			...adminData,
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
		console.log(req.adminId)
		const admin = await AdminModel.findById(req.adminId)
		
		if (!admin) {
			return res.status(404).json({
				message: 'user not found, sosite chlen'
			})
		}

		const {passwordHash, ...adminData} = admin._doc
		res.json(adminData)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'access denied'
		})
	}
}

export const getOrders = async (req, res) => {
	try {
		const orders = await OrderModel.find()

		if (!orders) {
			return res.status(404).json({
				message: 'no orders'
			})
		}

		res.json(orders)
	} catch (err) {
		res.status(500).json({
			message: 'Error'
		})
	}
} 

export const getUsers = async (req, res) => {
	try {
		const users = await UserModel.find()

		if (!users) {
			return res.status(404).json({
				message: 'no users'
			})
		}

		res.json(users)
	} catch (err) {
		res.status(500).json({
			message: 'error'
		})
	}
}