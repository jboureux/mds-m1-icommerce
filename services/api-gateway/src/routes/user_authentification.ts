import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post("/register_user", userController.registerUser);
router.post("/login_user", userController.loginUser);
router.delete("/deleteAllUser", userController.deleteAllUsers);

export default router;