'use strict';

export const getIndex = (req, res, next) => {
    res.render('main/index', {
        pageTitle: 'ToDo | Main',
    });
};
