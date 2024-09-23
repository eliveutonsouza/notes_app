// import crypto from 'crypto';
import IUser from '../contracts/IUser';
import UserService from '../services/UserService/UserService';
// import axios from 'axios';
import mongoose, { Document } from 'mongoose';
import db from '../database/connection';
import dotenv from 'dotenv';
import IPost from '../contracts/IPost';
import IUpdateUser from '../contracts/IUpdateUser';

dotenv.config();

// function generate(): string {
//     return crypto.randomBytes(20).toString('hex');
// }

// async function request(
//     url: string,
//     method: string,
//     data: Omit<IUser, 'posts'>
// ) {
//     return axios({ url, method, data });
// }
const userService = new UserService();

beforeAll(async () => {
    await db();
});

afterAll(async () => {
    await mongoose.disconnect();
});
const data: Omit<IUser, '_id'> = {
    name: 'userTest',
    email: 'userTest@hotmail.com',
    password: 'password',
    posts: new Array<IPost>(),
};

describe('create User', () => {
    test('should to create a user', async function () {
        const response: IUser = await userService.createUser(data);

        const responseNecessary = {
            name: response.name,
            email: response.email,
            password: response.password,
            posts: response.posts,
        };

        expect(responseNecessary).toStrictEqual(data);
        await userService.deleteUser(response.email);
    });
});

describe('find a User', () => {
    test('should to find a user', async function () {
        const user: IUser = await userService.createUser(data);

        const result: IUser & Document = await userService.findUserByEmail(
            user.email
        );
        expect(result.email).toStrictEqual(user.email);

        await userService.deleteUser(user.email);
    });
});

describe('delete a User', () => {
    test('should to delete a user', async function () {
        let error;
        try {
            const user: IUser = await userService.createUser(data);

            const result: IUser = await userService.deleteUser(user.email);

            await userService.findUserByEmail(result.email);
        } catch (err: any) {
            error = err.message;
        }

        expect(error).toBe('user doesnt exist');
    });
});

describe('update userName User', () => {
    test('should to update a user', async function () {
        const ObjectUserUpdate: IUpdateUser = {
            body: {
                name: 'newName',
            },
        };

        const user = await userService.createUser(data);

        const userUpdated = await userService.updateUser(
            user.email,
            ObjectUserUpdate
        );

        expect(user.name).not.toEqual(userUpdated.name);

        await userService.deleteUser(user.email);
    });
});

describe('update password User', () => {
    test('should to update a user', async function () {
        const ObjectUserUpdate: IUpdateUser = {
            body: {
                password: data.password,
                newPassword: 'newPassword',
            },
        };

        const user = await userService.createUser(data);

        const userUpdated = await userService.updateUser(
            user.email,
            ObjectUserUpdate
        );

        expect(user.password).not.toEqual(userUpdated.password);

        await userService.deleteUser(user.email);
    });
});
