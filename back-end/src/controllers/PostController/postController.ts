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

async function getPostByTitle(req: AuthReq, res: Response): Promise<void> {
    try {
        if (!req.query.title) throw new Error('you should to send a title');
        if (!req.user?.email) throw new Error('userEmail fail on request');

        const posts = await postService.getPostByTitle(
            req.user.email,
            req.query.title
        );

        res.status(200).json({
            msg: 'Success to get posts By Title',
            body: posts,
        });
    } catch (err: any) {
        res.status(400).json({
            msg: 'fail to get Post by Title',
            err: err.message,
        });
    }
}
async function getAllPosts(req: AuthReq, res: Response): Promise<void> {
    try {
        if (!req.query.page) throw new Error('you should to send a page');
        if (!req.user?.email) throw new Error('userEmail fail on request');

        const page = parseInt(req.query.page);
        const posts: IPost[] = await postService.getAllPosts(
            req.user.email,
            page
        );

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
        if (!req.user?.email) throw new Error('userEmail fail on request');
        const post: IPost = await postService.updatePost(
            req.body,
            _id,
            req.user.email
        );

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
        if (!req.user?.email) throw new Error('userEmail fail on request');

        const post: IPost = await postService.deletePost(_id, req?.user.email);

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

export { createPost, getAllPosts, updatePost, deletePost, getPostByTitle };
