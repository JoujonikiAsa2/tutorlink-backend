/* eslint-disable prefer-const */
import { ErrorRequestHandler } from 'express'
import { TErrorSources } from '../interface/error'
import handleDuplicateError from '../errors/handleDuplicateError'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'
import ApiError from '../errors/ApiError'

// global error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (err.code === 11000) {
    const error = handleDuplicateError(err)
    statusCode = error.statusCode
    message = error.message
    errorSources = error.errorSources
  } else if (err.name === 'ValidationError') {
    const error = handleValidationError(err)
    statusCode = error.statusCode
    message = error.message
    errorSources = error.errorSources
  } else if (err.name === 'CastError') {
    const error = handleCastError(err)
    statusCode = error.statusCode
    message = error.message
    errorSources = error.errorSources
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })

  next()
}

export default globalErrorHandler
