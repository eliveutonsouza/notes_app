import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
    async execute(userEmail: string): Promise<ResponseToken> {
        const expiresIn = 86400;
        const privateKeyJwt = process.env.PRIVATE_KEY_JWT;
        const token = sign(
            {},
            privateKeyJwt || 'e2ac90fa-2e12-4f99-8dde-7e3a7690ab35',
            {
                subject: userEmail,
                expiresIn,
            }
        );

        return { token, userEmail, expiresIn };
    }
}

export { GenerateTokenProvider };
