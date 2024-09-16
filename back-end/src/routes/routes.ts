import { Router } from 'express';
import authController from '../controllers/AuthController/authController';
import { registerController } from '../controllers/UserController/Register/registerController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
const router = Router();

router.post('/login', authController);

router.post('/register', registerController);

router.get('/', ensureAuthenticated, (req, res) => {
    res.send('initial page');
});

export default router;
