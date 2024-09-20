import { Router } from 'express';
import authController from '../controllers/AuthController/authController';
import { registerController } from '../controllers/UserController/Register/registerController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import {
    createPost,
    deletePost,
    getAllPosts,
    getPostByTitle,
    updatePost,
} from '../controllers/PostController/postController';

import { deleteUser } from '../controllers/UserController/userController';

const router = Router();

router.post('/login', authController);

router.post('/register', registerController);

router.delete('/user', ensureAuthenticated, deleteUser);
router.post('/post', ensureAuthenticated, createPost);
router.get('/post', ensureAuthenticated, getAllPosts);
router.put('/post/:_id', ensureAuthenticated, updatePost);
router.delete('/post/:_id', ensureAuthenticated, deletePost);
router.get('/post/title', ensureAuthenticated, getPostByTitle);

export default router;
