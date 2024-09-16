import { Response } from 'express';
import AuthReq = require('../../contracts/AuthReq');
import IPost = require('../../contracts/IPost');
import PostService from '../../services/PostService/PostService';
const postService: PostService = new PostService();

async function createPost(req: AuthReq, res: Response): Promise<void> {
    try {
        if (!req.user?.email) throw new Error('userEmail fail On request');
        const response = await postService.createPost(
            req.body,
            req.user?.email
        );

        res.status(201).json({
            msg: 'success to create a post',
            body: response,
        });
    } catch (err: any) {
        res.status(406).json({
            msg: 'fail to create a new Post',
            error: err.message,
        });
    }
}
async function getPosts(req: AuthReq, res: Response): Promise<void> {}
async function updatePost(req: AuthReq, res: Response): Promise<void> {}
async function deletePost(req: AuthReq, res: Response): Promise<void> {}

export { createPost, getPosts, updatePost, deletePost };
