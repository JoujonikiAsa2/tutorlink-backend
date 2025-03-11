import { User } from './user.model'

const findLastUser = async (role: string): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: role }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastStudent?.id ? lastStudent.id : undefined
}
export const generateUserId = async (userRole: string) => {
  let currentId = (0).toString()

  const lastStudentId = await findLastUser(userRole)

  if (lastStudentId != undefined) {
    currentId = lastStudentId.split("-")[1]
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  incrementId = `${incrementId}`

  return incrementId
}
