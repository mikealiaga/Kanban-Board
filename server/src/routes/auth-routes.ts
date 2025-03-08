import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // Extract username and password from request body
  const { username, password } = req.body;
  console.log("Login Attempt - Username:", username, "Password:", password);

  // Find the user in the database
  const user = await User.findOne({
    where: { username },
  });

  // Log if user is found
  if (!user) {
    console.log("User not found in database.");
    return res.status(401).json({ message: 'Authentication failed' });
  }

  console.log("User found:", user.username, "Stored Password:", user.password);

  const passwordIsValid = await bcrypt.compare(password, user.password);

  console.log("Password Match:", passwordIsValid);


  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  console.log("Login successful! Token generated.");

  return res.json({ token });
};


const router = Router();

router.post('/login', login);

export default router;