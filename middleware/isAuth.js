'use strict';

export const isAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        return res.redirect('/');
    }
    next();
};

export const loggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
        return res.redirect('/user/add-task');
    }
    next();
};
