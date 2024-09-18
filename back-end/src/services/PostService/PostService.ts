import IPost from '../../contracts/IPost';
import Post from '../../database/models/postModel';
import { Types } from 'mongoose';
import User from '../../database/models/userModel';

import UserService from '../UserService/UserService';
import PostValidation from './validations/PostValidation';

export default class PostService {
    postValidation: PostValidation = new PostValidation();
    userService: UserService = new UserService();

    async getAllPosts(userEmail: string, page: number): Promise<IPost[]> {
        try {
            const limit = 10;
            const user = await this.userService.findByEmail(userEmail);
            const userId = user._id;
            const posts = Post.find({ owner: userId })
                .limit(limit)
                .skip((page - 1) * limit);

            return posts;
        } catch (err) {
            throw err;
        }
    }

    async createPost(
        data: Omit<IPost, '_id'>,
        userEmail: string
    ): Promise<IPost> {
        try {
            this.postValidation.validation(data);

            const user = await this.userService.findByEmail(userEmail);

            if (!user) {
                throw new Error('cannot find a user.');
            }
            data.owner = user._id;

            const postInstance = new Post(data);
            const response = await postInstance.save();
            user.posts.push(response);

            await user.save();

            return response;
        } catch (err) {
            console.log(err);

            throw err;
        }
    }

    async updatePost(
        data: Pick<IPost, 'title' | 'description' | 'updatedAt'>,
        postId: Types.ObjectId
    ): Promise<IPost> {
        try {
            this.postValidation.validation(data);
            data.updatedAt = new Date();
            const postUpdated = await Post.findByIdAndUpdate(postId, data, {
                new: true,
            }).exec();

            if (!postUpdated) throw new Error('cannot find');

            return postUpdated;
        } catch (err) {
            console.log(err);

            throw err;
        }
    }

    async deletePost(postId: Types.ObjectId): Promise<IPost> {
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
