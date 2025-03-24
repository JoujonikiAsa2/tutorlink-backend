import { asyncHandler } from '../../utils/asyncHandler'
import { responseHandler } from '../../utils/responseHandler'
import { tutorServices } from './tutor.service'
import httpStatus from 'http-status'

const getAllTutors = asyncHandler(async (req, res) => {
  const query = req?.query
  const result = await tutorServices.getAllTutors(query)
  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor retrieved successfully!',
    meta: result.meta,
    data: result.result,
  })
})

const getTutorById = asyncHandler(async (req, res) => {
  const tutorId = req.params.tutorId
  const result = await tutorServices.getTutorById(tutorId)
  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor retrieved successfully!',
    data: result,
  })
})

const updateTutor = asyncHandler(async (req, res) => {
  const tutorId = req.params.tutorId
  const tutorInfo = { ...req.body, updatedAt: new Date() }
  const result = await tutorServices.updateTutor(tutorId, tutorInfo)
  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor updated successfully!',
    data: result,
  })
})

const deleteTutor = asyncHandler(async (req, res) => {
  const tutorId = req.params.tutorId
  const result = await tutorServices.deleteTutor(tutorId)
  responseHandler(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Tutor deleted successfully!',
  })
})

export const tutorControllers = {
  getAllTutors,
  getTutorById,
  updateTutor,
  deleteTutor
}
