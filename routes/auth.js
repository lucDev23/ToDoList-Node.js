'use strict';

import express from 'express';
import { body } from 'express-validator';

import * as authController from '../controllers/auth.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address')
            .custom(async (email, { req }) => {
                const user = await User.findOne({ email: email });
                console.log(user);
                if (user) {
                    throw new Error('E-Mail exists already');
                }
            })
            .normalizeEmail(),
        body(
            'username',
            'The username must consist of at least 5 alphanumeric characters.'
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
        body('password').isLength({ min: 6 }).isAlphanumeric().trim(),
        body('confirmPassword')
            .trim()
            .custom((confirmPassword, { req }) => {
                if (confirmPassword !== req.body.password) {
                    throw new Error('Passwords have to match!');
                }
                return true;
            }),
    ],
    authController.postSignup
);

export default router;
