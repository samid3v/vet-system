export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
          const error = new Error("Login has expired");
          error.statusCode = 401;
          throw error;
          return
    }
  
    jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  };