import IUser from '../../contracts/User';

export default class UserService {
    createUser(data: Omit<IUser, 'posts'>): String {
        return 'user created';
    }
}
