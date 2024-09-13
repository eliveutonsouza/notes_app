import crypto from 'crypto';

import axios from 'axios';
import mongoose from 'mongoose';
import db from '../database/connection';
import dotenv from 'dotenv';
import IPost from '../contracts/IPost';
import PostService from '../services/PostService/PostService';

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
const postService = new PostService();

beforeAll(async () => {
    await db();
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('create User', () => {
    test.only('should to create a user', async function () {
        const data: Omit<IPost, '_id'> = {
            title: generate(),
            description: generate(),
            owner: '66e06a1555b1b153a964dee1',
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
});
