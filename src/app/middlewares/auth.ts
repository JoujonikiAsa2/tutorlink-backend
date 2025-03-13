import { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyToken } from "../module/auth/auth.utils";
import config from "../config";
import { User } from "../module/user/user.model";
import ApiError from "../errors/ApiError";
import httpStatus from 'http-status'

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
        throw new ApiError('You are not Authorized', httpStatus.UNAUTHORIZED);
      }
      let decoded;
      try {
        decoded = await verifyToken(token, config.jwt_access_secret as string);
      } catch (err) {
        throw new ApiError('You are not Authorized', httpStatus.UNAUTHORIZED);
      }
  
      const { email, role, iat } = decoded;

      const user = await User.isUserExists(email);
      if (!user) {
        throw new ApiError('User not found', httpStatus.NOT_FOUND);
      }
  
      if (requiredRoles && requiredRoles.includes(role)) {
        req.user = decoded as JwtPayload;
      } else {
        throw new ApiError('You are not authorized', httpStatus.UNAUTHORIZED);
      }
  
      next();
    });
  };
  
  export default auth;