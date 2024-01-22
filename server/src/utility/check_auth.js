export const CheckAuth = (req, res, next) => {
    if (!req.session.admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}