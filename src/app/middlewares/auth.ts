import { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyToken } from "../module/auth/auth.utils";
import config from "../config";
import { User } from "../module/user/user.model";

export const userRole = {
  student: 'student',
  tutor: 'tutor',
  admin: 'admin',
} as const;

export type TUserRole = keyof typeof userRole;

const auth = (...requiredRoles: TUserRole[]) => {
    return asyncHandler(async (req, res, next) => {

      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('You are not Authorized');
      }
      let decoded;
      try {
        decoded = await verifyToken(token, config.jwt_access_secret as string);
      } catch (err) {
        throw new Error('Unauthorized');
      }
  
      const { email, role, iat } = decoded;

      const user = await User.isUserExists(email);
      if (!user) {
        throw new Error('User does not found');
      }
  
      if (requiredRoles && requiredRoles.includes(role)) {
        req.user = decoded as JwtPayload;
      } else {
        throw new Error('You are not Authorized');
      }
  
      next();
    });
  };
  
  export default auth;