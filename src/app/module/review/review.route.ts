import { Router } from 'express'
import auth, { userRole } from '../../middlewares/auth'
import { reviewControllers } from './review.controller'

const router = Router()
router.post('/', reviewControllers.createReview)
router.get('/', reviewControllers.getAllReviews)
router.get('/:reviewId', reviewControllers.getReviewById)
router.patch('/:reviewId', auth(userRole.tutor, userRole.admin ), reviewControllers.updateReview)
router.delete('/:reviewId', auth(userRole.tutor, userRole.admin), reviewControllers.deleteReview)
export const reviewsRoutes = router
