import { compare } from 'bcryptjs';
import { GenerateTokenProvider } from '../../../../providers/GenerateTokenProvider';
import UserService from '../../UserService';
interface IRequest {
    email: string;
    password: string;
}

class AuthenticateUserUseCase {
    userService: UserService = new UserService();
    async execute({ email, password }: IRequest) {
        try {
            const user = await this.userService.findUserByEmail(email);

            if (!user) {
                throw new Error('email or password wrong');
            }
            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('email or password wrong');
            }

            const generateTokenProvider = new GenerateTokenProvider();

            const token = await generateTokenProvider.execute(
                user.email,
                user.name
            );

            return token;
        } catch (error) {
            throw error;
        }
    }
}

export { AuthenticateUserUseCase };
