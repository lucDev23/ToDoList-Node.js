'use strict';

export const get404 = (req, res, next) => {
    res.status(404).render('error/404', { pageTitle: 'ToDo | Page Not Found' });
};
