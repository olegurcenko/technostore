import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import AdminModel from '../models/admin.js'

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

		res.header("Authorization", `${token}`)

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
