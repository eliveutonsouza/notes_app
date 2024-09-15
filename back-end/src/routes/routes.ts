import { Router } from 'express';
import authController from '../controllers/AuthController/authController';
const router = Router();

router.post('/login', authController);
router.get('/login', (req, res) => {
    res.send('hello there! welcome to join us');
});

export default router;
