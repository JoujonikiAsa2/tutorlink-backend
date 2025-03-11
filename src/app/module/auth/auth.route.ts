import { Router } from 'express'
import { authControllers } from './auth.controller'
const router = Router()

router.post('/register/tutor', authControllers.registerAsTutor)
router.post('/register/student', authControllers.registerAsStudent)
router.post('/login', authControllers.loginUser)

export const authRoutes = router