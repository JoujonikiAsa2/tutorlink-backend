import mongoose from 'mongoose'
import { TTutor } from '../tutor/tutor.interface'
import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'
import httpStatus from 'http-status'
import { generateUserId } from '../user/user.utils'
import { Tutor } from '../tutor/tutor.model'

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
    userData.id = "tutor-"+userId

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
  const userId = await generateUserId("student")
  //checking if the user exist
  const isUserExist = await User.isUserExists(payload?.email)
  if (isUserExist) {
    throw new Error('Email already exist')
  }

  const userData = {...payload, id: "student-"+userId}
  const result = await User.create(userData)
  return result
}

export const authServices = {
  registerAsTutor,
  registerAsStudent,
}
