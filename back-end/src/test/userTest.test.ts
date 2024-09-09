import crypto from 'crypto';
import IUser from '../contracts/User';
import UserService from '../services/UserService/UserService';
const axios = require('axios');
import mongoose from 'mongoose';
import db from '../database/connection';
import dotenv from 'dotenv';
import IPost from '../contracts/Post';

dotenv.config();

function generate(): String {
    return crypto.randomBytes(20).toString('hex');
}

async function request(
    url: String,
    method: String,
    data: Omit<IUser, 'posts'>
) {
    return axios({ url, method, data });
}

beforeAll(async () => {
    await db();
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('create User', () => {
    test('should to create a user', async function () {
        const data: Omit<IUser, '_id'> = {
            name: generate(),
            email: generate(),
            password: generate(),
            posts: new Array<IPost>(),
        };

        const userService = new UserService();

        const response: IUser = await userService.createUser(data);

        const responseNecessary = {
            name: response.name,
            email: response.email,
            password: response.password,
            posts: response.posts,
        };

        expect(responseNecessary).toStrictEqual(data);
    });
});
