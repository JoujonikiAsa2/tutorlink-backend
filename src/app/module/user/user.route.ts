import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();
router.get('/', userControllers.getAllUser);
export const userRoutes = router;