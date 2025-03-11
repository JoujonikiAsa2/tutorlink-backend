import { asyncHandler } from '../../utils/asyncHandler'
import { responseHandler } from '../../utils/responseHandler'
import { reviewServices } from './review.service'

const createReview = asyncHandler(async (req, res) => {
    const result = await reviewServices.createReview(req.body)
    responseHandler(res, {
      statusCode: 201,
      success: true,
      message: 'Review created successfully!',
      data: result,
    })
  })

const getAllReviews = asyncHandler(async (req, res) => {
  const result = await reviewServices.getAllReview()
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Review retrieved successfully!',
    data: result,
  })
})

const getReviewById = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId
  const result = await reviewServices.getReviewById(reviewId)
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Review retrieved successfully!',
    data: result,
  })
})

const updateReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId
  const tutorInfo = { ...req.body, updatedAt: new Date() }
  const result = await reviewServices.updateReview(reviewId, tutorInfo)
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Review updated successfully!',
    data: result,
  })
})

const deleteReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId
  const result = await reviewServices.deleteReview(reviewId)
  console.log(result)
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Review deleted successfully!',
  })
})

export const reviewControllers = {
    createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
}
