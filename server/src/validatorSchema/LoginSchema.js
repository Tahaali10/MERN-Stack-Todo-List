import { check } from 'express-validator'

export const LoginSchema = [
    check('username', 'Username is required').exists().isAlphanumeric().withMessage('username should be alphanumeric character only').trim().isLength({ min: 6, max: 32 }),
    check('password', 'Password is required').exists().isLength({ min: 6, max: 32 }).trim(),
    
]