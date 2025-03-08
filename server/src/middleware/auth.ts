import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void | Response => {
  // Get the authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401); 
  }

  // Extract the token 
  const token = authHeader.split(' ')[1];

  // Get the secret key from the environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }

    if (user) {
      req.user = user as JwtPayload;
      return next();
    }

    return res.sendStatus(403); 
  });
};
