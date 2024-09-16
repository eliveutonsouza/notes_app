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
            const user = await this.userService.findByEmail(email);

            if (!user) {
                throw new Error('email or password wrong');
            }
            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('email or password wrong');
            }

            const generateTokenProvider = new GenerateTokenProvider();

            const token = generateTokenProvider.execute(user.email);

            return token;
        } catch (error) {
            throw error;
        }
    }
}

export { AuthenticateUserUseCase };
