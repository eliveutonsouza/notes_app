import IUser from '../../contracts/IUser';
import UserModel from '../../database/models/userModel';
import { User } from '../../entity/User';
export default class UserService {
    async createUser(data: Omit<IUser, '_id'>): Promise<IUser> {
        try {
            const userInstance = new UserModel(data);

            const response = await userInstance.save();

            return response;
        } catch (err) {
            console.log(err);
            throw new Error('failed to save a user');
        }
    }
    async findByEmail(email: string): Promise<IUser> {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error('user doesnt exist');
            }

            const userFromDB: IUser = new User(
                user._id,
                user.name,
                user.email,
                user.password,
                user.posts
            );

            return userFromDB;
        } catch (e) {
            console.log(e);
            throw new Error('Failed to find');
        }
    }
}
