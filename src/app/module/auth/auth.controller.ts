import config from '../../config'
import { asyncHandler } from '../../utils/asyncHandler'
import { responseHandler } from '../../utils/responseHandler'
import { authServices } from './auth.service'
import httpStatus from 'http-status'

//tutor
const registerAsTutor = asyncHandler(async (req, res) => {
  const result = await authServices.registerAsTutor(req.body)
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  })
})

//student
const registerAsStudent = asyncHandler(async (req, res) => {
  const result = await authServices.registerAsStudent(req.body)
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  })
})

//student
const loginUser = asyncHandler(async (req, res) => {
  const result = await authServices.login(req.body)
  const { accessToken, refreshToken } = result
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
  })
  responseHandler(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successfully',
    data: {
      accessToken,
    },
  })
})

export const authControllers = {
  registerAsTutor,
  registerAsStudent,
  loginUser,
}
