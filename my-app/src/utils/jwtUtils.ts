import * as jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'smart-student-management-system-educloud';
const JWT_EXPIRY = (process.env.JWT_EXPIRY || '30m') as SignOptions['expiresIn']; 

export interface TokenPayload {
  id: string;
  email: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
  name?: string;
  schoolName?: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const hasuraClaims = {
    "x-hasura-allowed-roles": ["admin", "teacher", "parent", "student"],
    "x-hasura-default-role": payload.role,
    "x-hasura-user-id": payload.id,
  };

  return jwt.sign(
    {
      ...payload,
      "https://hasura.io/jwt/claims": hasuraClaims,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRY,
    }
  );
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export const extractToken = (authHeader?: string): string | null => {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
    return parts[1];
  }
  return null;
};

export const verifyRequestToken = (authHeader?: string): TokenPayload | null => {
  const token = extractToken(authHeader);
  if (!token) return null;
  return verifyToken(token);
};