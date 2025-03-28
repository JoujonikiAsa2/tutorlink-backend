import { Router } from "express";
import { userRoutes } from "../module/user/user.route";
import { authRoutes } from "../module/auth/auth.route";
import { tutorRoutes } from "../module/tutor/tutor.route";
import { reviewsRoutes } from "../module/review/review.route";
import { subjectRoutes } from "../module/subject/subject.route";
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
    },
    {
        path: '/reviews',
        route: reviewsRoutes
    },
    {
        path: '/subjects',
        route: subjectRoutes
    }
]

moduleRoutes.forEach(({path, route})=> router.use(path, route))
export default router