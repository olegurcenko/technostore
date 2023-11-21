import { body } from 'express-validator'

export const adminValidator = [
	body('email', 'Not correct email').isEmail(),
	body('password', 'Password is too simple').isLength({min: 10},),
]