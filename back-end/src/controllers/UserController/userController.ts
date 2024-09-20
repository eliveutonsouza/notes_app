import { Response } from 'express';

import AuthReq = require('../../contracts/AuthReq');
import UserService from '../../services/UserService/UserService';

const userService: UserService = new UserService();

async function deleteUser(req: AuthReq, res: Response): Promise<void> {
    try {
        if (!req.user?.email) throw new Error('userEmail fail on request');

        const response = await userService.deleteUser(req.user.email);

        res.status(201).json({
            msg: 'success to delete a user',
            body: response,
        });
    } catch (err: any) {
        res.status(406).json({
            msg: 'fail to delete a user',
            error: err.message,
        });
    }
}

export { deleteUser };
