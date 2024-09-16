import { Document } from 'mongoose';
import IUser from '../../contracts/IUser';
import UserModel from '../../database/models/userModel';
import { hash } from 'bcryptjs';
import Validation from './validations/UserValidation';

export default class UserService {
    validation: Validation = new Validation();
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
    async findByEmail(email: string): Promise<IUser & Document> {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error('user doesnt exist');
            }

            return user;
        } catch (err) {
            throw err;
        }
    }
}
