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
import { Types } from 'mongoose';

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
    colorHex: '#ffffff',
};

const postFailData = { ...postData };

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

describe('fail Title create a Post', () => {
    test('should to throw a error create a post', async function () {
        let err;
        try {
            postFailData.title = '';
            await postService.createPost(postFailData, userData.email);
        } catch (e: any) {
            err = e;
        }
        postFailData.title = postData.title;
        expect(err.message).toStrictEqual('title cannot be null');
    });
});
describe('fail description create a Post', () => {
    test('should to throw a error create a post', async function () {
        let err;
        try {
            postFailData.description = '';
            await postService.createPost(postFailData, userData.email);
        } catch (e: any) {
            err = e;
        }
        postFailData.description = postData.description;
        expect(err.message).toStrictEqual('desc cannot be null');
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

describe('Error get Posts by Title', () => {
    test('should to throw error get post by Title', async function () {
        postFailData.title = 'AnotherOneTitlethatdoesntexist';
        let err;
        const post1 = await postService.createPost(postData, userData.email);
        const post2 = await postService.createPost(postData, userData.email);
        try {
            await postService.getPostByTitle(
                userData.email,
                postFailData.title
            );
        } catch (e: any) {
            err = e;
        }
        expect(err.message).toStrictEqual('cannot find your post');

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

describe('empty vector get Posts', () => {
    test('should to return empty vector trying get all posts', async function () {
        let response;
        const post1 = await postService.createPost(postData, userData.email);

        const post2 = await postService.createPost(postData, userData.email);

        await postService.createPost(postData, userData.email);

        try {
            response = await postService.getAllPosts(userData.email, 2);
        } catch (e: any) {}

        expect(response?.posts).toStrictEqual([]);

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

describe('Error delete a post', () => {
    test('should to throw error delete a post', async function () {
        let err;
        const id = new Types.ObjectId('66ed6b81112c180eec72ef00');

        try {
            await postService.deletePost(id, userData.email);
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('post doesnt exist');
    });
});

describe('update a post', () => {
    test('should to update a post', async function () {
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: 'newTitle',
            updatedAt: undefined,
            description: 'new Description',
            colorHex: '#39ff33',
        };
        const postUpdated = await postService.updatePost(
            newPost,
            responseCreate._id,
            userData.email
        );

        expect(postUpdated).toBeDefined();
        expect(postUpdated.title).toStrictEqual(newPost.title);
        expect(postUpdated.description).toStrictEqual(newPost.description);
        expect(postUpdated.colorHex).toStrictEqual(newPost.colorHex);

        await postService.deletePost(responseCreate._id, userData.email);
    });
});
describe('Error title update a post', () => {
    test('should to throw error update a post', async function () {
        let err;
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: '',
            updatedAt: undefined,
            description: 'new Description',
            colorHex: '#ffffff',
        };
        try {
            await postService.updatePost(
                newPost,
                responseCreate._id,
                userData.email
            );
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('title cannot be null');

        await postService.deletePost(responseCreate._id, userData.email);
    });
});

describe('Error description update a post', () => {
    test('should to throw error update a post', async function () {
        let err;
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: 'title',
            updatedAt: undefined,
            description: '',
            colorHex: '#ffffff',
        };
        try {
            await postService.updatePost(
                newPost,
                responseCreate._id,
                userData.email
            );
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('desc cannot be null');

        await postService.deletePost(responseCreate._id, userData.email);
    });
});

describe('Error colorHex cannot be null update a post', () => {
    test('should to throw error update a post', async function () {
        let err;
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: 'title',
            updatedAt: undefined,
            description: 'asdasdasdasdas',
            colorHex: '',
        };
        try {
            await postService.updatePost(
                newPost,
                responseCreate._id,
                userData.email
            );
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('ColorHex cannot be null');

        await postService.deletePost(responseCreate._id, userData.email);
    });
});

describe('Error colorHex invalid color update a post', () => {
    test('should to throw error update a post', async function () {
        let err;
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: 'title',
            updatedAt: undefined,
            description: 'asdasdasdasdas',
            colorHex: '465',
        };
        try {
            await postService.updatePost(
                newPost,
                responseCreate._id,
                userData.email
            );
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('color invalid');

        await postService.deletePost(responseCreate._id, userData.email);
    });
});
