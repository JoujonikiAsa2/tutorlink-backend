import { Router } from "express";
import { userRoutes } from "../module/user/user.route";
const router = Router()
const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    }
]

moduleRoutes.forEach(({path, route})=> router.use(path, route))
export default router