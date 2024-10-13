import IUser from '../../../contracts/IUser';
import UserModel from '../../../database/models/userModel';

export default class UserValidation {
    async validationRegister(
        data: Pick<IUser, 'email' | 'name' | 'password'>
    ): Promise<void> {
        await this.emailValidation(data.email);
        this.usernameValidation(data.name);
        this.passwordValidation(data.password);
    }

    private async emailValidation(email: string): Promise<void> {
        const responseUser = await UserModel.findOne({ email });

        if (responseUser) throw new Error('user already Exists');

        if (!email) throw new Error('cannot be Null');
        const rgxEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!rgxEmail.test(email)) {
            throw new Error('Email invalid');
        }
    }

    public usernameValidation(username: string): void {
        if (!username) throw new Error('cannot be null');

        if (username.length < 3)
            throw new Error('username should be more than 3 characters');

        if (username.length > 50)
            throw new Error('username should be less than 50 characters');
    }

    public passwordValidation(password: string): void {
        if (!password) throw new Error('cannot be null');

        if (password.length < 8)
            throw new Error('password should be more than 7 characters');
    }
}
