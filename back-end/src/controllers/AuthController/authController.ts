import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../../services/UserService/validations/Auth/AuthUser';

const auth = new AuthenticateUserUseCase();

export default async function authController(
    request: Request,
    response: Response
) {
    try {
        const responseAuth = await auth.execute(request.body);

        response
            .json({
                token: responseAuth,
                msg: 'success',
            })
            .status(200);
    } catch (e) {
        console.error(e);
        response
            .json({
                msg: 'unauthorized',
            })
            .status(401);
    }
}
