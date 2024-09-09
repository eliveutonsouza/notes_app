import crypto from 'crypto';
import IUser from '../contracts/User';
import UserService from '../services/UserService/UserService';
const axios = require('axios');

function generate(): String {
    return crypto.randomBytes(20).toString('hex');
}

async function request(url: String, method: String, data: IUser) {
    return axios({ url, method, data });
}

describe('create User', () => {
    test('should to create a user', async function () {
        const data: Omit<IUser, 'posts'> = {
            id: generate(),
            name: generate(),
            email: generate(),
            password: generate(),
        };

        const userService = new UserService();

        const response = userService.createUser(data);

        expect(response).toBeDefined();
    });
});
