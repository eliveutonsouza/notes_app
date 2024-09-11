import IUser from '../../contracts/User';
import User from '../../database/models/userModel';
export default class UserService {
    async createUser(data: Omit<IUser, '_id'>): Promise<IUser> {
        try {
            const userInstance = new User(data);

            const response = await userInstance.save();

            return response;
        } catch (err) {
            console.log(err);
            throw new Error('failed to save a user');
        }
    }
}
