export const checkManager = (req, res, next) => {
    if (req.user.role !== 'manager') {
        return res.status(403).json({ error: 'Permission denied' });
    }
    next();
};
