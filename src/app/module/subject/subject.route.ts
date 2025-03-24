import { Router } from 'express'
import auth, { userRole } from '../../middlewares/auth'
import { subjectControllers } from './subject.controller'

const router = Router()
router.post('/',auth(userRole.tutor, userRole.admin ), subjectControllers.createSubject)
router.get('/', subjectControllers.getAllSubjects)
router.get('/:reviewId', subjectControllers.getSubjectById)
router.patch('/:reviewId', auth(userRole.tutor, userRole.admin ), subjectControllers.updateSubject)
router.delete('/:reviewId', auth(userRole.tutor, userRole.admin), subjectControllers.deleteSubject)
export const subjectRoutes = router
