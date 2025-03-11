import { Router } from 'express'
import { tutorControllers } from './tutor.controller'
import auth, { userRole } from '../../middlewares/auth'

const router = Router()
router.get('/', tutorControllers.getAllTutors)
router.get('/:tutorId', tutorControllers.getTutorById)
router.patch('/:tutorId', auth(userRole.tutor, userRole.admin ), tutorControllers.updateTutor)
router.delete('/:tutorId', auth(userRole.tutor, userRole.admin), tutorControllers.deleteTutor)
export const tutorRoutes = router
