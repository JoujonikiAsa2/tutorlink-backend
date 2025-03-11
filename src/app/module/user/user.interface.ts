import { Model } from "mongoose"

export type TUser = {
    id: string
  name: string
  email: string
  phone: string
  gender: 'male' | 'female' | 'other'
  password: string
  role: 'student' | 'tutor' | 'admin'
  profileImage?: string
}

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}

