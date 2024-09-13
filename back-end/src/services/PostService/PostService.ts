import IPost from '../../contracts/IPost';
import Post from '../../database/models/postModel';

import UserService from '../UserService/UserService';
export default class PostService {
    userService: UserService = new UserService();
    async createPost(data: Omit<IPost, '_id'>): Promise<IPost> {
        try {
            const user = await this.userService.findByEmail(
                'a2882b7be69010696ee82aa58dc4b3597ff5a08f'
            );

            if (!user) {
                throw new Error('cannot find a user.');
            }

            const postInstance = new Post(data);
            const response = await postInstance.save();
            user.posts.push(response);

            await user.save();

            return response;
        } catch (err) {
            console.log(err);

            throw new Error('failed to save a Post');
        }
    }
}
