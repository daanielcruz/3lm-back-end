import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return res.status(401).json({ auth: false, message: 'No token provided.' });
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  if (process.env.SECRET) {
    jwt.verify(bearerToken, process.env.SECRET, err => {
      if (err) {
        return res
          .status(500)
          .json({ auth: false, message: 'Failed to authenticate token.' });
      }

      next();
    });
  }

  return;
};

export default AuthMiddleware;
