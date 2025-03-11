import { Router } from "express";
import { userRoutes } from "../module/user/user.route";
import { authRoutes } from "../module/auth/auth.route";
import { tutorRoutes } from "../module/tutor/tutor.route";
const router = Router()
const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/tutors',
        route: tutorRoutes
    }
]

moduleRoutes.forEach(({path, route})=> router.use(path, route))
export default router