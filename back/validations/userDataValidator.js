import { body } from 'express-validator'

export const userValidator = [
	body('email', 'Not correct email').isEmail(),
	body('password', 'Password is too short').isLength({min:8}),
]