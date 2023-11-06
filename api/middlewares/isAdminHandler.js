
export function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin' && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
}