import crypto from 'crypto';

import axios from 'axios';
import mongoose from 'mongoose';
import db from '../database/connection';
import dotenv from 'dotenv';
import IPost from '../contracts/IPost';
import PostService from '../services/PostService/PostService';
import UserService from '../services/UserService/UserService';

dotenv.config();

function generate(): string {
    return crypto.randomBytes(20).toString('hex');
}

async function request(
    url: string,
    method: string,
    data: Omit<IPost, 'posts'>
) {
    return axios({ url, method, data });
}
const userService = new UserService();
const postService = new PostService();

beforeAll(async () => {
    await db();
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('create a Post', () => {
    test('should to create a post', async function () {
        const data: Omit<IPost, '_id'> = {
            title: generate(),
            description: generate(),
            owner: '66e60d2930b2f68d8bd67de9',
            updatedAt: undefined,
            createdAt: new Date(),
        };

        const response: IPost = await postService.createPost(data);

        const responseNecessary = {
            title: response.title,
            description: response.description,
            owner: response.owner.toString(),
            updatedAt: response.updatedAt,
            createdAt: response.createdAt,
        };

        console.log(responseNecessary, data);

        expect(responseNecessary).toStrictEqual(data);
    });

    describe('update a post', () => {
        test('should to update a post', async function () {
            const data: Pick<IPost, 'title' | 'description'> = {
                title: generate(),
                description: generate(),
            };
            const usr = await userService.findByEmail(
                'a2882b7be69010696ee82aa58dc4b3597ff5a08f'
            );

            const postResponse = await postService.updatePost(
                data,
                usr.posts[0]._id
            );

            const responseNecessary = {
                title: postResponse.title,
                description: postResponse.description,
            };

            console.log(responseNecessary, data);

            expect(responseNecessary).toStrictEqual(data);
        });
    });
});

describe('delete a post', () => {
    test.only('should to delete a post', async function () {
        const usr = await userService.findByEmail(
            '35479f6873837b113c0a58575c8d5569cf24088e'
        );

        const initialPostCount = usr.posts.length;

        expect(initialPostCount).toBeGreaterThan(0);

        const postId = usr.posts[0]._id;

        await postService.deletePost(postId);

        const updatedUsr = await userService.findByEmail(
            '35479f6873837b113c0a58575c8d5569cf24088e'
        );

        expect(updatedUsr.posts.length).toBe(initialPostCount - 1);
    });
});
