import express from 'express';
import * as userController from '../controllers/userController';
import verifyToken from '../middlewares/jwtMiddleware';
const router = express.Router();

router.post('/register_user', userController.registerUser);
router.post('/login_user', userController.loginUser);
router.delete('/deleteAllUser', userController.deleteAllUsers);
router.route('/getUserData').post(verifyToken, userController.getUserData);

export default router;
