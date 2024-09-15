import { ObjectId } from 'mongoose';
import IPost from '../../contracts/IPost';
import Post from '../../database/models/postModel';
import User from '../../database/models/userModel';

import UserService from '../UserService/UserService';
export default class PostService {
    userService: UserService = new UserService();
    async createPost(data: Omit<IPost, '_id'>): Promise<IPost> {
        try {
            const user = await this.userService.findByEmail(
                '35479f6873837b113c0a58575c8d5569cf24088e'
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

    async updatePost(
        data: Pick<IPost, 'title' | 'description'>,
        postId: ObjectId
    ): Promise<IPost> {
        try {
            const postUpdated = await Post.findByIdAndUpdate(postId, data, {
                new: true,
            }).exec();

            if (!postUpdated) throw new Error('cannot find');

            return postUpdated;
        } catch (err) {
            console.log(err);

            throw new Error('failed to save a Post');
        }
    }

    async deletePost(postId: ObjectId): Promise<IPost> {
        try {
            const postDeleted = await Post.findByIdAndDelete(postId);

            if (!postDeleted) throw new Error('post doesnt exist');

            await User.updateMany(
                { posts: postId },
                { $pull: { posts: postId } }
            );

            return postDeleted;
        } catch (err) {
            throw new Error('failed to delete a post');
        }
    }
}
