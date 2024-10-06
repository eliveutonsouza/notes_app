import { Document } from 'mongoose';
import IUser from '../../contracts/IUser';
import UserModel from '../../database/models/userModel';
import PostModel from '../../database/models/postModel';
import { hash, compare } from 'bcryptjs';
import Validation from './validations/UserValidation';
import IUpdateUserPassword from '../../contracts/IUpdateUserPassword';
import IUpdateUser from '../../contracts/IUpdateUser';

export default class UserService {
    private readonly validation: Validation = new Validation();
    async createUser(data: Omit<IUser, '_id'>): Promise<IUser> {
        try {
            await this.validation.validationRegister(data);

            data.password = await hash(data.password, 8);

            const userInstance = new UserModel(data);

            const response = await userInstance.save();

            return response;
        } catch (err) {
            throw err;
        }
    }
    async findUserByEmail(email: string): Promise<IUser & Document> {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) throw new Error('user doesnt exist');

            return user;
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(email: string): Promise<IUser> {
        try {
            const user = await this.findUserByEmail(email);

            await PostModel.deleteMany({
                owner: user._id,
            });

            const usrDeleted = await UserModel.findOneAndDelete({
                _id: user._id,
            });
            if (!usrDeleted)
                throw new Error('error trying to findOneAndDelete');

            return usrDeleted;
        } catch (err) {
            throw err;
        }
    }

    async updateUser(email: string, data: IUpdateUser): Promise<IUser> {
        try {
            if (
                !data.body.name &&
                !data.body.newPassword &&
                !data.body.password
            )
                throw new Error('nothing to update'); //five

            if (
                (data.body.newPassword && !data.body.password) ||
                (!data.body.newPassword && data.body.password)
            )
                throw new Error('missing new password or act password'); // four and two

            let user;

            if (data.body.name) {
                user = await this.updateUserUserName(email, data.body.name); //first
            }

            // i should to take care about this beucase it's my validatiooooon daaaamn :((:

            // body 1,0,0 - first - allowed
            // body 0,1,0 - two - denied
            // body 0,1,1 - three - allowed
            // body 0,0,1 - four - denied
            // body 0,0,0 - five - denied
            // body 1,1,1 - six -  allowed

            if (data.body.newPassword && data.body.password) {
                //three
                const dataPassword: IUpdateUserPassword = {
                    userPassword: data.body.password,
                    newPassword: data.body.newPassword,
                };
                user = await this.updateUserPassword(email, dataPassword);
            }

            if (!user) throw new Error('failed');

            return user;
        } catch (err) {
            throw err;
        }
    }

    private async updateUserUserName(
        email: string,
        newName: string
    ): Promise<IUser> {
        try {
            const user = await this.findUserByEmail(email);

            this.validation.usernameValidation(newName);

            user.name = newName;

            await user.save();

            return user;
        } catch (err) {
            throw err;
        }
    }

    private async updateUserPassword(
        email: string,
        data: IUpdateUserPassword
    ): Promise<IUser> {
        try {
            const user = await this.findUserByEmail(email);

            const passwordMatch = await compare(
                data.userPassword,
                user.password
            );

            if (!passwordMatch) throw new Error('password wrong');

            this.validation.passwordValidation(data.newPassword);

            const newPassword = await hash(data.newPassword, 8);

            user.password = newPassword;
            await user.save();

            return user;
        } catch (err) {
            throw err;
        }
    }
}
