import crypto from 'crypto';

// import axios from 'axios';
import mongoose, { Schema } from 'mongoose';
import db from '../database/connection';
import dotenv from 'dotenv';
import IPost from '../contracts/IPost';
import IUser from '../contracts/IUser';
import PostService from '../services/PostService/PostService';
import UserService from '../services/UserService/UserService';
import PaginationIPost from '../contracts/PaginationIPost';

dotenv.config();

function generate(): string {
    return crypto.randomBytes(20).toString('hex');
}

const userData: Omit<IUser, '_id'> = {
    name: 'postTest',
    email: 'postTest@hotmail.com',
    password: 'password',
    posts: new Array<IPost>(),
};

// async function request(
//     url: string,
//     method: string,
//     data: Omit<IPost, 'posts'>
// ) {
//     return axios({ url, method, data });
// }
const userService = new UserService();
const postService = new PostService();

const postData: Omit<IPost, '_id'> = {
    title: generate(),
    description: generate(),
    owner: new Schema.ObjectId(''),
    updatedAt: undefined,
    createdAt: new Date(),
};

beforeAll(async () => {
    await db();
    await userService.createUser(userData);
});

afterAll(async () => {
    await userService.deleteUser(userData.email);
    await mongoose.disconnect();
});

describe('create a Post', () => {
    test('should to create a post', async function () {
        const response: IPost = await postService.createPost(
            postData,
            userData.email
        );

        const responseNecessary = {
            title: response.title,
            description: response.description,
        };

        expect(response).toBeDefined();

        expect(responseNecessary.title).toStrictEqual(postData.title);
        expect(responseNecessary.description).toStrictEqual(
            postData.description
        );

        await postService.deletePost(response._id, userData.email);
    });
});

describe('get Posts by Title', () => {
    test('should to get post by Title', async function () {
        const post1 = await postService.createPost(postData, userData.email);
        const post2 = await postService.createPost(postData, userData.email);

        const response: IPost[] = await postService.getPostByTitle(
            userData.email,
            postData.title
        );

        expect(response[0].title).toStrictEqual(postData.title);
        expect(response[1].title).toStrictEqual(postData.title);

        await postService.deletePost(post1._id, userData.email);
        await postService.deletePost(post2._id, userData.email);
    });
});

describe('get Posts', () => {
    test('should to get all posts', async function () {
        const post1 = await postService.createPost(postData, userData.email);

        const post2 = await postService.createPost(postData, userData.email);

        await postService.createPost(postData, userData.email);

        const response: PaginationIPost = await postService.getAllPosts(
            userData.email,
            1
        );

        expect(response.posts.length).toEqual(3);

        await postService.deletePost(post1._id, userData.email);
        await postService.deletePost(post2._id, userData.email);
    });
});

describe('delete a post', () => {
    test('should to delete a post', async function () {
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );

        const respDel = await postService.deletePost(
            responseCreate._id,
            userData.email
        );

        expect(respDel).toBeDefined();
        expect(respDel._id).toStrictEqual(responseCreate._id);
    });
});

describe('update a post', () => {
    test('should to update a post', async function () {
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<IPost, 'title' | 'updatedAt' | 'description'> = {
            title: 'newTitle',
            updatedAt: undefined,
            description: 'new Description',
        };
        const postUpdated = await postService.updatePost(
            newPost,
            responseCreate._id,
            userData.email
        );

        expect(postUpdated).toBeDefined();
        expect(postUpdated.title).toStrictEqual(newPost.title);
        expect(postUpdated.description).toStrictEqual(newPost.description);

        await postService.deletePost(responseCreate._id, userData.email);
    });
});
