import { Router } from 'express';
import authController from '../controllers/AuthController/authController';
import { registerController } from '../controllers/UserController/Register/registerController';
const router = Router();

router.post('/login', authController);

router.post('/register', registerController);

export default router;
