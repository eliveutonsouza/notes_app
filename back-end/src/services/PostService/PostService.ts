import IPost from '../../contracts/IPost';
import Post from '../../database/models/postModel';

import { ObjectId, Types } from 'mongoose';
import User from '../../database/models/userModel';
import UserService from '../UserService/UserService';
import PostValidation from './validations/PostValidation';
import PaginationIPost from '../../contracts/PaginationIPost';

export default class PostService {
    private readonly postValidation: PostValidation = new PostValidation();
    private readonly userService: UserService = new UserService();

    async getAllPosts(
        userEmail: string,
        page: number
    ): Promise<PaginationIPost> {
        try {
            const limit = 10;
            const user = await this.userService.findUserByEmail(userEmail);
            const userId = user._id;
            const posts = await Post.find({ owner: userId })
                .limit(limit)
                .skip((page - 1) * limit);

            const postsCount = await Post.countDocuments({ owner: userId });

            const maxPage = Math.ceil(postsCount / limit);

            return {
                posts,
                documentCount: postsCount,
                limit,
                maxPage,
            };
        } catch (err) {
            throw err;
        }
    }

    async getPostByTitle(userEmail: string, title: string): Promise<IPost[]> {
        try {
            const user = (
                await this.userService.findUserByEmail(userEmail)
            ).populate('posts');

            const posts = (await user).posts.filter((post) =>
                post.title
                    .toLowerCase()
                    .trim()
                    .includes(title.toLowerCase().trim())
            );

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

            const user = await this.userService.findUserByEmail(userEmail);

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
            throw err;
        }
    }

    async updatePost(
        data: Pick<IPost, 'title' | 'description' | 'updatedAt' | 'colorHex'>,
        postId: Types.ObjectId | ObjectId,
        userEmail: string
    ): Promise<IPost> {
        try {
            const user = await this.userService.findUserByEmail(userEmail);

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

    async deletePost(
        postId: ObjectId | Types.ObjectId,
        email: string
    ): Promise<IPost> {
        try {
            const user = await this.userService.findUserByEmail(email);

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
