import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();
router.get('/', userControllers.getAllUser);
router.get('/:email', userControllers.getUserByEmail);
export const userRoutes = router;