import { Review } from './review.model'
import { TReview } from './review.interface'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

export const createReview = async (payload: TReview) => {
  try {
    const existingReview = await Review.findOne({
      tutorId: payload.tutorId,
      studentId: payload.studentId,
    })
    if (existingReview) {
      throw new ApiError('Review already exists', httpStatus.CONFLICT)
    }
    const review = await Review.create(payload)
    await review.save()
    return review
  } catch (error) {
    throw new ApiError('Error creating review', httpStatus.BAD_REQUEST)
  }
}

export const getAllReview = async () => {
  try {
    const review = await Review.find()
    if (!review) {
      throw new ApiError('Review not found',httpStatus.NOT_FOUND)
    }
    return review
  } catch (error) {
    throw new ApiError('Error fetching review', httpStatus.BAD_REQUEST)
  }
}

export const getReviewById = async (reviewId: string) => {
  try {
    const review = await Review.findById(reviewId)
    if (!review) {
      throw new ApiError('Review not found', httpStatus.NOT_FOUND)
    }
    return review
  } catch (error) {
    throw new ApiError('Error fetching review', httpStatus.BAD_REQUEST)
  }
}

export const updateReview = async (
  reviewId: string,
  payload: Partial<TReview>
) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(reviewId, payload, {
      new: true,
    })
    if (!updatedReview) {
      throw new ApiError('Review not found', httpStatus.NOT_FOUND)
    }
    return updatedReview
  } catch (error) {
    throw new ApiError('Error updating review', httpStatus.BAD_REQUEST)
  }
}

export const deleteReview = async (reviewId: string) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId)
    if (!deletedReview) {
      throw new ApiError('Review not found', httpStatus.NOT_FOUND)
    }
    return deletedReview
  } catch (error) {
    throw new ApiError('Error deleting review', httpStatus.BAD_REQUEST)
  }
}

export const reviewServices = {
  getAllReview,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
}
