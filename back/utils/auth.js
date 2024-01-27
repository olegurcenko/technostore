import jwt from 'jsonwebtoken'
import UserModel from "../models/user.js";
import AdminModel from "../models/admin.js";

export const userAuth = async (req, res, next) => {
	try {
		const token = req.headers["authorization"].replace(/Bearer\s?/, '')

		console.log(token)

		const decoded = jwt.verify(token, 'secret123')

		console.log(decoded._id)

		req.userId = decoded._id
		next()
		
	} catch (err) {
		//console.log(err)
		res.status(500).json({
			message: 'User not found'
		})
	}
}

export const adminAuth = async (req, res, next) => {
	try {
		const token = req.headers["authorization"].replace(/Bearer\s?/, '')

		console.log(token)

		const decoded = jwt.verify(token, 'secret123')

		console.log(decoded._id)

		req.adminId = decoded._id
		next()
		
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Admin not found'
		})
	}
}