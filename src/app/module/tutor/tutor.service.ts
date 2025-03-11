import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { tutorSearchFields } from './tutor.constant'
import { Tutor } from './tutor.model'
import { TTutor } from './tutor.interface'
import { User } from '../user/user.model'

const getAllTutors = async (query: Record<string, unknown>) => {
    const tutorQuery = new QueryBuilder(Tutor.find({}).populate('user'), query)
      .search(tutorSearchFields)
      .filter()
      .filterAvailability()
      .sort()
      .paginate()
  
    const result = await tutorQuery.modelQuery
    console.log("Before Execution Query:", JSON.stringify(tutorQuery.modelQuery.getFilter(), null, 2));
    const meta = await tutorQuery.count()
    return {
      result: result,
      meta: meta,
    }
  }
  

const getTutorById = async (tutorId: string) => {
  try {
    const tutor = await Tutor.findById(tutorId).populate('user', '-password')
    if (!tutor) {
      throw new Error('Tutor not found')
    }
    return tutor
  } catch (error) {
    throw new Error(`Error fetching tutor`)
  }
}

const updateTutor = async (tutorId: string, payload: Partial<TTutor>) => {
    // Start session for transaction
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
  
      // Find the tutor
      const tutor = await Tutor.findById(tutorId);
      if (!tutor) {
        throw new Error("Tutor not found");
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
        );
      }
  
      // Update tutor data
      const updatedTutor = await Tutor.findByIdAndUpdate(
        tutorId,
        payload,
        { new: true, session }
      );
  
      if (!updatedTutor) {
        throw new Error("Failed to update tutor");
      }
  
      // Commit transaction
      await session.commitTransaction();
      session.endSession();
  
      return updatedTutor;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Error updating tutor`);
    }
  };
  

  const deleteTutor = async (tutorId: string) => {
    // Start session for transaction
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
  
      // Find the tutor
      const tutor = await Tutor.findById(tutorId);
      if (!tutor) {
        throw new Error("Tutor not found");
      }
  
      // Delete the associated user
      await User.findByIdAndDelete(tutor.user, { session });
  
      // Delete the tutor
      await Tutor.findByIdAndDelete(tutorId, { session });
  
      // Commit transaction
      await session.commitTransaction();
      session.endSession();
  
      return { message: "Tutor deleted successfully" };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Error deleting tutor`);
    }
  };

export const tutorServices = {
  getTutorById,
  getAllTutors,
  updateTutor,  
  deleteTutor
}
