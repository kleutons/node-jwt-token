import { UserRole } from './src/data/users';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      name: string;
      role: UserRole;
    };
  }
}