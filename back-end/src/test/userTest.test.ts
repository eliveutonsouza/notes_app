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
const dataFail = { ...data };

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

describe('Fail cannot be null create User', () => {
    test('should to throw error create a user', async function () {
        const errMessage = 'cannot be Null';
        let err: any;
        dataFail.email = '';
        try {
            await userService.createUser(dataFail);
        } catch (e: any) {
            err = e;
        }
        dataFail.email = data.email;

        expect(err.message).toStrictEqual(errMessage);
    });
});

describe('Fail Email format create User', () => {
    test('should to throw error create a user', async function () {
        const errMessage = 'Email invalid';
        let err: any;
        dataFail.email = 'testemail';
        try {
            await userService.createUser(dataFail);
        } catch (e: any) {
            err = e;
        }
        dataFail.email = data.email;
        expect(err.message).toStrictEqual(errMessage);
    });
});

describe('Fail password create User', () => {
    test('should to throw error create a user', async function () {
        const errMessage = 'password should be more than 7 characters';
        let err: any;
        dataFail.password = '1234';
        try {
            await userService.createUser(dataFail);
        } catch (e: any) {
            err = e;
        }
        dataFail.password = data.password;
        expect(err.message).toStrictEqual(errMessage);
    });
});

describe('Fail name create User', () => {
    test('should to throw error create a user', async function () {
        const errMessage = 'username should be more than 3 characters';
        let err: any;
        dataFail.name = 'a';
        try {
            await userService.createUser(dataFail);
        } catch (e: any) {
            err = e;
        }

        dataFail.name = data.name;

        expect(err.message).toStrictEqual(errMessage);
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

describe('fail to delete a User', () => {
    test('should to throw Error delete a user', async function () {
        dataFail.email = '12312737';
        let error;
        try {
            await userService.deleteUser(dataFail.email);
        } catch (err: any) {
            error = err.message;
        }
        dataFail.email = data.email;
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

describe('Fail update userName User', () => {
    test('should to update a user', async function () {
        const msgErr = 'username should be more than 3 characters';
        let err;
        const user = await userService.createUser(data);
        try {
            const ObjectUserUpdate: IUpdateUser = {
                body: {
                    name: 'a',
                },
            };
            await userService.updateUser(user.email, ObjectUserUpdate);
        } catch (e: any) {
            err = e;
        }

        await userService.deleteUser(user.email);
        expect(err.message).toStrictEqual(msgErr);
    });
});

describe('Fail update Object Void', () => {
    test('should to update a user', async function () {
        const msgErr = 'nothing to update';
        let err;
        const user = await userService.createUser(data);
        try {
            const ObjectUserUpdate: IUpdateUser = {
                body: {},
            };
            await userService.updateUser(user.email, ObjectUserUpdate);
        } catch (e: any) {
            err = e;
            await userService.deleteUser(user.email);
        }
        expect(err.message).toStrictEqual(msgErr);
    });
});

describe('Fail update Username length empty', () => {
    test('should to update a user', async function () {
        const msgErr = 'username should be more than 3 characters';
        let err;
        const user = await userService.createUser(data);
        try {
            const ObjectUserUpdate: IUpdateUser = {
                body: {
                    name: 'a',
                    password: '1234',
                    newPassword: '12345',
                },
            };
            await userService.updateUser(user.email, ObjectUserUpdate);
        } catch (e: any) {
            err = e;
        }
        await userService.deleteUser(user.email);
        expect(err.message).toStrictEqual(msgErr);
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

describe('Fail update Password miss new Password', () => {
    test('should to update a user', async function () {
        const msgErr = 'missing new password or act password';
        let err;
        const user = await userService.createUser(data);
        try {
            const ObjectUserUpdate: IUpdateUser = {
                body: {
                    name: 'testeUser',
                    password: '1234',
                    newPassword: '',
                },
            };
            await userService.updateUser(user.email, ObjectUserUpdate);
        } catch (e: any) {
            err = e;
        }
        await userService.deleteUser(user.email);
        expect(err.message).toStrictEqual(msgErr);
    });
});
describe('Fail update Password miss password ', () => {
    test('should to update a user', async function () {
        const msgErr = 'missing new password or act password';
        let err;
        const user = await userService.createUser(data);
        try {
            const ObjectUserUpdate: IUpdateUser = {
                body: {
                    name: 'testeUser',
                    password: '',
                    newPassword: '13245',
                },
            };
            await userService.updateUser(user.email, ObjectUserUpdate);
        } catch (e: any) {
            err = e;
        }
        await userService.deleteUser(user.email);
        expect(err.message).toStrictEqual(msgErr);
    });
});
