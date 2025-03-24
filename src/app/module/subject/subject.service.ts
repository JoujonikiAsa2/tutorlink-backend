import { Subject } from './subject.model'
import { TSubject } from './subject.interface'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

// Create a new subject
const createSubject = async (payload: TSubject) => {
  try {
    const subject = new Subject(payload)
    const result = await subject.save()
    return result
  } catch (error:any) {
    throw new ApiError(error, httpStatus.BAD_REQUEST)
  }
}

// Get all subjects
const getAllSubjects = async () => {
  try {
    const result = await Subject.find()
    return result
  } catch (error:any) {
    throw new ApiError('Error retrieving subjects', httpStatus.BAD_REQUEST)
  }
}

// Get a subject by ID
const getSubjectById = async (subjectId: string) => {
  try {
    const result = await Subject.findById(subjectId)
    if (!result) {
      throw new ApiError('Subject not found', httpStatus.NOT_FOUND)
    }
    return result
  } catch (error:any) {
    throw new ApiError('Error retrieving subject', httpStatus.BAD_REQUEST)
  }
}

// Update a subject by ID
const updateSubject = async (subjectId: string, payload: Partial<TSubject>) => {
  try {
    const result = await Subject.findByIdAndUpdate(subjectId, payload, { new: true })
    if (!result) {
      throw new ApiError('Subject not found', httpStatus.NOT_FOUND)
    }
    return result
  } catch (error:any) {
    throw new ApiError('Error updating subject', httpStatus.BAD_REQUEST)
  }
}

// Delete a subject by ID
const deleteSubject = async (subjectId: string) => {
  try {
    const result = await Subject.findByIdAndDelete(subjectId)
    if (!result) {
      throw new ApiError('Subject not found', httpStatus.NOT_FOUND)
    }
    return result
  } catch (error:any) {
    throw new ApiError('Error deleting subject', httpStatus.BAD_REQUEST)
  }
}

export const subjectServices = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
}

