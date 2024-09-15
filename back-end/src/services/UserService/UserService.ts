import { Document } from 'mongoose';
import IUser from '../../contracts/IUser';
import UserModel from '../../database/models/userModel';
import { hash } from 'bcryptjs';

export default class UserService {
    async createUser(data: Omit<IUser, '_id'>): Promise<IUser> {
        try {
            console.log(data.password);
            data.password = await hash(data.password, 8);
            console.log(data.password);
            const userInstance = new UserModel(data);

            const response = await userInstance.save();

            return response;
        } catch (err) {
            console.log(err);
            throw new Error('failed to save a user');
        }
    }
    async findByEmail(email: string): Promise<IUser & Document> {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error('user doesnt exist');
            }

            return user;
        } catch (e) {
            console.log(e);
            throw new Error('Failed to find');
        }
    }
}
