import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthReq from '../contracts/AuthReq';
import dotenv from 'dotenv';

dotenv.config();

export function ensureAuthenticated(
    request: AuthReq,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            message: 'Token is missing',
        });
    }

    const [, token] = authToken.split(' ');

    const privateKeyToken = process.env.PRIVATE_KEY_JWT;

    if (!privateKeyToken) throw new Error('missing keyToken');

    try {
        const decoded = verify(token, privateKeyToken);

        const { sub } = decoded as { sub: string };

        request.user = {
            email: sub,
        };

        return next();
    } catch (e) {
        return response.status(401).json({
            message: 'token invalid',
        });
    }
}
