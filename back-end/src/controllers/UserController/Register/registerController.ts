import { Request, Response } from 'express';
import UserService from '../../../services/UserService/UserService';

const userService = new UserService();

async function registerController(request: Request, response: Response) {
    try {
        const data = request.body;

        const responseCreateUser = await userService.createUser(data);

        response.status(201).json({
            msg: 'success to register a new user.',
            user: responseCreateUser,
        });
    } catch (e) {
        response.status(406).json({
            msg: 'fail to register a new User',
        });
    }
}

export { registerController };
