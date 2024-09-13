import { compare } from 'bcryptjs';
import User from '../../../../database/models/userModel';
import { GenerateTokenProvider } from '../../../../providers/GenerateTokenProvider';
interface IRequest {
    email: string;
    password: string;
}

class AuthenticateUserUseCase {
    async execute({ email, password }: IRequest) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('email or password wrong');
            }
            const passwordMatch = compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('email or password wrong');
            }

            const generateTokenProvider = new GenerateTokenProvider();

            const token = generateTokenProvider.execute(user.email);

            return token;
        } catch (error) {
            throw new Error('Auth failed');
        }
    }
}

export { AuthenticateUserUseCase };
