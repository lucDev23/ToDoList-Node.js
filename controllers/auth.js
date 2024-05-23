export const getLogin = (req, res, next) => {
    res.render('auth/login');
};

export const getSignup = (req, res, next) => {
    res.render('auth/signup');
};
