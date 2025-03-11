import { asyncHandler } from '../../utils/asyncHandler'
import { responseHandler } from '../../utils/responseHandler'
import { tutorServices } from './tutor.service'

const getAllTutors = asyncHandler(async (req, res) => {
  const query = req?.query
  const result = await tutorServices.getAllTutors(query)
  responseHandler(res, {
    statusCode: 200,
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
    statusCode: 200,
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
    statusCode: 200,
    success: true,
    message: 'Tutor updated successfully!',
    data: result,
  })
})

const deleteTutor = asyncHandler(async (req, res) => {
  const tutorId = req.params.tutorId
  const result = await tutorServices.deleteTutor(tutorId)
  console.log(result)
  responseHandler(res, {
    statusCode: 200,
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
