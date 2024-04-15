import jwt from 'jsonwebtoken';
import { UserModel } from './Models/user.model';

export const generateAuthToken = (user: any) => {
  const payload = { username: user.username, isAdmin: user.isAdmin };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyAuthToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const isAdmin = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const decoded = verifyAuthToken(token);
  if (!decoded || !decoded.isAdmin) return res.status(403).json({ message: 'Forbidden' });

  next();
};
