import { asyncHandler } from '../../utils/asyncHandler'
import { responseHandler } from '../../utils/responseHandler'
import { subjectServices } from './subject.service'
import httpStatus from 'http-status'

const getAllSubjects = asyncHandler(async (req, res) => {
  const result = await subjectServices.getAllSubjects()
  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subjects retrieved successfully!',
    data: result,
  })
})

const getSubjectById = asyncHandler(async (req, res) => {
  const subjectId = req.params.subjectId
  const result = await subjectServices.getSubjectById(subjectId)
  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subject retrieved successfully!',
    data: result,
  })
})

const createSubject = asyncHandler(async (req, res) => {
  const subjectInfo = { ...req.body, createdAt: new Date() }
  const result = await subjectServices.createSubject(subjectInfo)
  responseHandler(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Subject created successfully!',
    data: result,
  })
})

const updateSubject = asyncHandler(async (req, res) => {
  const subjectId = req.params.subjectId
  const subjectInfo = { ...req.body, updatedAt: new Date() }
  const result = await subjectServices.updateSubject(subjectId, subjectInfo)
  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subject updated successfully!',
    data: result,
  })
})

const deleteSubject = asyncHandler(async (req, res) => {
  const subjectId = req.params.subjectId
  const result = await subjectServices.deleteSubject(subjectId)
  responseHandler(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Subject deleted successfully!',
  })
})

export const subjectControllers = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
}
