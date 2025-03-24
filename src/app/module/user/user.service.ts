import { User } from './user.model'

const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}

const getUserByEmail = async(email: string) => {
  const result = await User.findOne({email})
  return result
}

export const userServices = {
  getAllUsersFromDB,
  getUserByEmail
}
