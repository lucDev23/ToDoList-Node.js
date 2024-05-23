export const getIndex = (req, res, next) => {
    res.render('main/index', {
        pageTitle: 'LuDev to do',
    });
};
