import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { tutorSearchFields } from './tutor.constant'
import { Tutor } from './tutor.model'
import { TTutor } from './tutor.interface'
import { User } from '../user/user.model'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const getAllTutors = async (query: Record<string, unknown>) => {
  try {
    const tutorQuery = new QueryBuilder(Tutor.find({}).populate('user'), query)
      .search(tutorSearchFields)
      .filter()
      .filterAvailability()
      .sort()
      .paginate()

    const result = await tutorQuery.modelQuery
    const meta = await tutorQuery.count()
    if(meta.totalDoc <= 0){
      throw new ApiError("No tutors found", httpStatus.BAD_REQUEST)
    }
    return {
      result: result,
      meta: meta,
    }
  } catch (error) {
    throw new ApiError(error as string, httpStatus.BAD_REQUEST)
  }
}

const getTutorById = async (tutorId: string) => {
  try {
    const tutor = await Tutor.findById(tutorId).populate('user', '-password')
    if (!tutor) {
      throw new ApiError('Tutor does not exist', httpStatus.NOT_FOUND)
    }
    return tutor
  } catch (error) {
    throw new ApiError(error as string, httpStatus.BAD_REQUEST)
  }
}

const updateTutor = async (tutorId: string, payload: Partial<TTutor>) => {
  // Start session for transaction
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    // Find the tutor
    const tutor = await Tutor.findById(tutorId)
    if (!tutor) {
      throw new ApiError('Tutor does not exist', httpStatus.NOT_FOUND)
    }

    // Update the user data (if needed)
    if (payload.name || payload.phone || payload.profileImage) {
      await User.findByIdAndUpdate(
        tutor.user,
        {
          name: payload.name,
          phone: payload.phone,
          profileImage: payload.profileImage,
        },
        { new: true, session }
      )
    }

    // Update tutor data
    const updatedTutor = await Tutor.findByIdAndUpdate(tutorId, payload, {
      new: true,
      session,
    })

    if (!updatedTutor) {
      throw new ApiError('Failed to update tutor', httpStatus.BAD_REQUEST)
    }

    // Commit transaction
    await session.commitTransaction()
    session.endSession()

    return updatedTutor
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new ApiError(error as string, httpStatus.BAD_REQUEST)
  }
}

const deleteTutor = async (tutorId: string) => {
  // Start session for transaction
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    // Find the tutor
    const tutor = await Tutor.findById(tutorId)
    if (tutor === null) {
      throw new ApiError(
        'The content you are trying to delete does not exist or has already been deleted',
        httpStatus.NOT_FOUND
      )
    }

    // Delete the associated user
    await User.findByIdAndDelete(tutor?.user, { session })

    // Delete the tutor
    const deletedTutor = await Tutor.findByIdAndDelete(tutorId, { session })
    console.log(deletedTutor)
    // Commit transaction
    await session.commitTransaction()
    session.endSession()

    return { message: 'Tutor deleted successfully' }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    console.log(error)
    throw new ApiError(error as string, httpStatus.BAD_REQUEST)
  }
}

export const tutorServices = {
  getTutorById,
  getAllTutors,
  updateTutor,
  deleteTutor,
}
