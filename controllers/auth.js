'use strict';

import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { validationResult } from 'express-validator';

export const getLogin = (req, res, next) => {
    res.render('auth/login');
};

export const getSignup = (req, res, next) => {
    res.render('auth/signup');
};

export const postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email, password);
};

export const postSignup = async (req, res, next) => {
    // Get the data from the front end signup form
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    // Check for errors in the input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0]);
        return res.redirect('/auth/signup');
    }

    try {
        // Hash the password before save it in the db
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the user with the data
        const user = new User({
            email: email,
            username: username,
            password: hashedPassword,
        });

        // Save the use in the db
        await user.save();

        // Redirect the user
        res.redirect('/user');
    } catch (error) {
        console.log('34 auth.js: ', error);
    }
};
