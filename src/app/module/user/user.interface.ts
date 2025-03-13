import { Model, Types } from "mongoose"

export type TUser = {
  _id?: Types.ObjectId
    id: string
  name: string
  email: string
  phone: string
  age:number
  gender: 'male' | 'female' | 'other'
  password: string
  role: 'student' | 'tutor' | 'admin'
  profileImage?: string
  yourLocation: string
  class?:string,
  subject?:[string]
}

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}

