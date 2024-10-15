import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class GenerateTokenProvider {
    async execute(userEmail: string, userName: string): Promise<ResponseToken> {
        const expiresIn = 86400;
        const privateKeyToken = process.env.PRIVATE_KEY_JWT;
        if (!privateKeyToken) throw new Error('missing keyJwT');
        const token = sign({ userName: userName }, privateKeyToken, {
            subject: userEmail,
            expiresIn,
        });

        return { token, userEmail, expiresIn, userName };
    }
}

export { GenerateTokenProvider };
