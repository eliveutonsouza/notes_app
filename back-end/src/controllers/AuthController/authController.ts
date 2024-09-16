import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../../services/UserService/validations/Auth/AuthUser';

const auth = new AuthenticateUserUseCase();

export default async function authController(
    request: Request,
    response: Response
) {
    try {
        const responseAuth = await auth.execute(request.body);

        response.status(200).json({
            token: responseAuth,
            msg: 'success',
        });
    } catch (e: any) {
        response.status(401).json({
            msg: 'unauthorized',
            err: e.message,
        });
    }
}
