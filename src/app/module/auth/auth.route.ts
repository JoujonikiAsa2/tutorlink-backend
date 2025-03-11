import { Router } from 'express'
import { authControllers } from './auth.controller'
const router = Router()

router.post('/register/tutor', authControllers.registerAsTutor)
router.post('/register/student', authControllers.registerAsStudent)

export const authRoutes = router