import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
    async execute(userEmail: string) {
        const privateKeyJwt = process.env.PRIVATE_KEY_JWT;
        const token = sign(
            {},
            privateKeyJwt || 'e2ac90fa-2e12-4f99-8dde-7e3a7690ab35',
            {
                subject: userEmail,
                expiresIn: 300,
            }
        );

        return token;
    }
}

export { GenerateTokenProvider };
