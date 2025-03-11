import { Review } from './review.model'
import { TReview } from './review.interface'

export const createReview = async (payload: TReview) => {
  try {
    const existingReview = await Review.findOne({
      tutorId: payload.tutorId,
      studentId: payload.studentId,
    })
    if (existingReview) {
      throw new Error('Review already exists')
    }
    const review = await Review.create(payload)
    await review.save()
    return review
  } catch (error) {
    throw new Error('Error creating review')
  }
}

export const getAllReview = async () => {
  try {
    const review = await Review.find()
    if (!review) {
      throw new Error('Review not found')
    }
    return review
  } catch (error) {
    throw new Error('Error fetching review')
  }
}

export const getReviewById = async (reviewId: string) => {
  try {
    const review = await Review.findById(reviewId)
    if (!review) {
      throw new Error('Review not found')
    }
    return review
  } catch (error) {
    throw new Error('Error fetching review')
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
      throw new Error('Review not found')
    }
    return updatedReview
  } catch (error) {
    throw new Error('Error updating review')
  }
}

export const deleteReview = async (reviewId: string) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId)
    if (!deletedReview) {
      throw new Error('Review not found')
    }
    return deletedReview
  } catch (error) {
    throw new Error('Error deleting review')
  }
}

export const reviewServices = {
  getAllReview,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
}
