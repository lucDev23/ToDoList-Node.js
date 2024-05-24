'use strict';

import express from 'express';
import { body } from 'express-validator';

import * as authController from '../controllers/auth.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login',
    [
        body(['email', 'password'], 'All fields are required').notEmpty(),
        body('email', 'Please enter a valid email address.').isEmail(),
        body('password', 'Password must have at least 6 characters')
            .isLength({ min: 6 })
            .trim(),
    ],
    authController.postLogin
);

router.post(
    '/signup',
    [
        body(
            ['email', 'username', 'password', 'confirmPassword'],
            'All fields are required'
        ).notEmpty(),

        body('email', 'Please enter a valid email address')
            .isEmail()
            .custom(async (email, { req }) => {
                const user = await User.findOne({ email: email });
                if (user) {
                    throw new Error('E-Mail exists already');
                }
            }),

        body(
            'username',
            'The username must consist of at least 5 alphanumeric characters.'
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),

        body('password', 'Password must have at least 6 characters')
            .isLength({ min: 6 })
            .trim(),

        body('confirmPassword')
            .trim()
            .custom((confirmPassword, { req }) => {
                if (confirmPassword !== req.body.password) {
                    throw new Error("Passwords doesn't match!");
                }
                return true;
            }),
    ],
    authController.postSignup
);

export default router;
