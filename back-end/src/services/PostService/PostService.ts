import IPost from '../../contracts/Post';
import Post from '../../database/models/postModel';
import User from '../../database/models/userModel';
export default class PostService {
    async createPost(data: Omit<IPost, '_id'>): Promise<IPost> {
        try {
            const user = await User.findOne({
                email: '89ee5a4d65d0b5bc1f038bea3b15038d986e2650',
            });
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
