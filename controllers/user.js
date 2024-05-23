export const getIndex = (req, res, next) => {
    res.render('user/index', {
        pageTitle: 'My tasks',
    });
};
