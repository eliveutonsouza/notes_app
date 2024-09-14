import crypto from 'crypto';
import IUser from '../contracts/IUser';
import UserService from '../services/UserService/UserService';
import axios from 'axios';
import mongoose, { Document } from 'mongoose';
import db from '../database/connection';
import dotenv from 'dotenv';
import IPost from '../contracts/IPost';

dotenv.config();

function generate(): string {
    return crypto.randomBytes(20).toString('hex');
}

async function request(
    url: string,
    method: string,
    data: Omit<IUser, 'posts'>
) {
    return axios({ url, method, data });
}
const userService = new UserService();

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

describe('find a User', () => {
    test.only('should to find a user', async function () {
        const mockEmail = 'a2882b7be69010696ee82aa58dc4b3597ff5a08f';

        const result: IUser & Document =
            await userService.findByEmail(mockEmail);
        console.log(result);
        expect(result.email).toStrictEqual(mockEmail);
    });
});
