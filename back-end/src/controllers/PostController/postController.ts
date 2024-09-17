import { Response } from 'express';
import { Types } from 'mongoose';
import AuthReq = require('../../contracts/AuthReq');
import IPost = require('../../contracts/IPost');
import PostService from '../../services/PostService/PostService';

const postService: PostService = new PostService();

async function createPost(req: AuthReq, res: Response): Promise<void> {
    try {
        if (!req.user?.email) throw new Error('userEmail fail on request');
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
async function getAllPosts(req: AuthReq, res: Response): Promise<void> {
    try {
        if (!req.user?.email) throw new Error('userEmail fail on request');

        const posts: IPost[] = await postService.getAllPosts(req.user.email);

        res.status(200).json({
            msg: 'Success to get all posts',
            body: posts,
        });
    } catch (err: any) {
        res.status(400).json({
            msg: 'fail to get all posts',
            err: err.message,
        });
    }
}
async function updatePost(req: AuthReq, res: Response): Promise<void> {
    try {
        const _id: Types.ObjectId = new Types.ObjectId(req.params._id);

        const post: IPost = await postService.updatePost(req.body, _id);

        res.status(201).json({
            msg: 'post Updated',
            body: post,
        });
    } catch (err: any) {
        res.status(406).json({
            msg: 'error trying to update a post',
            err: err.message,
        });
    }
}

async function deletePost(req: AuthReq, res: Response): Promise<void> {
    try {
        const _id: Types.ObjectId = new Types.ObjectId(req.params._id);

        const post: IPost = await postService.deletePost(_id);

        res.status(200).json({
            msg: 'post deleted',
            body: post,
        });
    } catch (err: any) {
        res.status(400).json({
            msg: 'cannot delete a post',
            err: err.message,
        });
    }
}

export { createPost, getAllPosts, updatePost, deletePost };
