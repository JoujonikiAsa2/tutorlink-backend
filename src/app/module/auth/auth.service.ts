import mongoose from 'mongoose'
import { TTutor } from '../tutor/tutor.interface'
import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'
import httpStatus from 'http-status'
import { generateUserId } from '../user/user.utils'
import { Tutor } from '../tutor/tutor.model'
import { createToken } from './auth.utils'
import config from '../../config'

const registerAsTutor = async (payload: TTutor) => {
  //sert userdata
  const userData: Partial<TUser> = {}
  userData.name = payload?.name
  userData.phone = payload?.phone
  userData.role = 'tutor'
  userData.gender = payload?.gender
  userData.profileImage = payload?.profileImage
  userData.email = payload?.email
  userData.password = payload?.password

  //checking if the user exist
  const isUserExist = await User.isUserExists(payload?.email)
  if (isUserExist) {
    throw new Error('Email already exist')
  }

  // start session
  const session = await mongoose.startSession()
  try {
    //start transaction
    session.startTransaction()
    const userId = await generateUserId('tutor')
    userData.id = 'tutor-' + userId

    //creating user
    const newUser = await User.create([userData], { session })
    if (!newUser.length) {
      throw new Error('Failed to create user')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    //create new tutor
    const newTutor = await Tutor.create([payload], { session })
    if (!newTutor.length) {
      throw new Error('Failed to create student')
    }

    //commit the transaction
    await session.commitTransaction()
    //end the session
    session.endSession()
    return newTutor
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    throw err
  }
}
const registerAsStudent = async (payload: TUser) => {
  const userId = await generateUserId('student')
  //checking if the user exist
  const isUserExist = await User.isUserExists(payload?.email)
  if (isUserExist) {
    throw new Error('Email already exist')
  }

  const userData = { ...payload, id: 'student-' + userId }
  const result = await User.create(userData)
  return result
}

const login = async (payload: Partial<TUser>) => {
  const { email, password } = payload

  const user = await User.isUserExists(email as string)
  if (!user) {
    throw new Error('Invalid User')
  }

  const passwordMatch = await User.isPasswordMatch(
    password as string,
    user?.password
  )

  if (!passwordMatch) {
    console.log('password is not match')
    throw new Error('Password does not match')
  }

    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expire_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expire_in as string,
    );
    console.log(refreshToken)
  
    return {
      accessToken,
      refreshToken,
    };
}

export const authServices = {
  registerAsTutor,
  registerAsStudent,
  login
}
