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

    async getPostByTitle(userEmail: string, title: string): Promise<IPost[]> {
        try {
            const user = (
                await this.userService.findByEmail(userEmail)
            ).populate('posts');

            const posts = (await user).posts.filter((post) =>
                post.title.includes(title)
            );
            if (posts.length < 1) {
                throw new Error('cannot find your post');
            }
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
        postId: Types.ObjectId,
        userEmail: string
    ): Promise<IPost> {
        try {
            const user = await this.userService.findByEmail(userEmail);

            const postExist = user.posts.find((post) => {
                return post._id.toString() === postId.toString();
            });

            if (!postExist) throw new Error('post doesnt exist');

            this.postValidation.validation(data);
            data.updatedAt = new Date();
            const postUpdated = await Post.findByIdAndUpdate(
                postExist._id,
                data,
                {
                    new: true,
                }
            ).exec();

            if (!postUpdated) throw new Error('error trying to get a post');

            return postUpdated;
        } catch (err) {
            throw err;
        }
    }

    async deletePost(postId: Types.ObjectId, email: string): Promise<IPost> {
        try {
            const user = await this.userService.findByEmail(email);

            const postExist = user.posts.find((post) => {
                return post._id.toString() === postId.toString();
            });
            if (!postExist) throw new Error('post doesnt exist');

            const postDeleted = await Post.findByIdAndDelete(postExist._id);

            if (!postDeleted) throw new Error('error Trying to get a post');

            await User.updateMany(
                { posts: postId },
                { $pull: { posts: postId } }
            );

            return postDeleted;
        } catch (err) {
            throw err;
        }
    }
}
