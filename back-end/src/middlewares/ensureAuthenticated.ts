import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
export function ensureAuthenticated(
    request: Request,
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

    const keyToken = process.env.PRIVATE_KEY_JWT;

    try {
        verify(token, keyToken || 'e2ac90fa-2e12-4f99-8dde-7e3a7690ab35');
        return next();
    } catch (e) {
        return response.status(401).json({
            message: 'token invalid',
        });
    }
}
