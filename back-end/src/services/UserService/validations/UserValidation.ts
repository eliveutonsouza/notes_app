import IUser from '../../../contracts/IUser';

export default class Validation {
    validationRegister(data: Pick<IUser, 'email' | 'name' | 'password'>): void {
        this.emailValidation(data.email);
        this.usernameValidation(data.name);
        this.passwordValidation(data.password);
    }

    emailValidation(email: string): void {
        if (!email) throw new Error('cannot be Null');
        const rgxEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!rgxEmail.test(email)) {
            throw new Error('Email invalid');
        }
    }

    usernameValidation(username: string): void {
        if (!username) throw new Error('cannot be null');
        if (username.length < 3)
            throw new Error('username should be more than 3 characters');

        if (username.length > 20)
            throw new Error('username should be less than 20 characters');
    }

    passwordValidation(password: string): void {
        if (!password) throw new Error('cannot be null');

        if (password.length < 8)
            throw new Error('password should be more than 7 characters');
    }
}
