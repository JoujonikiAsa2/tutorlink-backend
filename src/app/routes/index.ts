import { Router } from "express";
import { userRoutes } from "../module/user/user.route";
import { authRoutes } from "../module/auth/auth.route";
const router = Router()
const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/users',
        route: userRoutes
    }
]

moduleRoutes.forEach(({path, route})=> router.use(path, route))
export default router