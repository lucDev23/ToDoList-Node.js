'use strict';

import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { validationResult } from 'express-validator';
import validator from 'validator';

export const getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'ToDo | Sign in',
        errorMessage: undefined,
        oldInputs: {
            email: '',
            password: '',
        },
    });
};

export const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'ToDo | Sign up',
        errorMessage: undefined,
        oldInputs: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    });
};

export const postLogin = async (req, res, next) => {
    let email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('auth/login', {
            pageTitle: 'ToDo | Sign in',
            errorMessage: errors.array()[0].msg,
            oldInputs: {
                email: email,
                password: password,
            },
        });
    }

    try {
        const normalizedEmail = validator.normalizeEmail(email);
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(400).render('auth/login', {
                pageTitle: 'ToDo | Sign in',
                errorMessage: 'Invalid email or password',
                oldInputs: {
                    email: email,
                    password: password,
                },
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            req.session.user = user;
            await req.session.save();
            return res.redirect('/user/add-task');
        }

        return res.status(400).render('auth/login', {
            pageTitle: 'Task Manager | Sign in',
            errorMessage: 'Invalid email or password',
            oldInputs: {
                email: email,
                password: password,
            },
        });
    } catch (error) {}
};

export const postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('auth/signup', {
            pageTitle: 'Task Manager | Sign up',
            errorMessage: errors.array()[0].msg,
            oldInputs: {
                email: email,
                username: username,
                password: password,
                confirmPassword: req.body.confirmPassword,
            },
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: validator.normalizeEmail(email),
            username: username,
            password: hashedPassword,
        });
        await user.save();
        req.session.user = user;
        await req.session.save();
        res.redirect('/user/add-task');
    } catch (error) {
        console.log('34 auth.js: ', error);
    }
};
