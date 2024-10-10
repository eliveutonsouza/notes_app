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

import {
    deleteUser,
    updateUser,
} from '../controllers/UserController/userController';

const router = Router();

router.get('/welcome', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to API notes_app</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            margin-top: 100px;
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to API notes_app</h1>
        <p>Your API is up and running!</p>
    </div>
</body>
</html>
`);
});

router.post('/login', authController);

router.post('/register', registerController);

router.delete('/user', ensureAuthenticated, deleteUser);
router.put('/user', ensureAuthenticated, updateUser);
router.post('/post', ensureAuthenticated, createPost);
router.get('/post', ensureAuthenticated, getAllPosts);
router.put('/post/:_id', ensureAuthenticated, updatePost);
router.delete('/post/:_id', ensureAuthenticated, deletePost);
router.get('/post/title', ensureAuthenticated, getPostByTitle);

export default router;
