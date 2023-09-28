import { check } from 'express-validator'

export const RegisterSchema = [
    check('name').trim().isAlpha().withMessage('Name Should be Alphabets Only'),
    check('username', 'Username is required').exists().isAlphanumeric().withMessage('username should be alphanumeric character only').trim().isLength({ min: 6, max: 32 }),
    check('password', 'Password is required').exists().isLength({ min: 6, max: 32 }).trim(),
    check('email', 'Email is required').exists().isEmail()
    
]