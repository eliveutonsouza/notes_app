import crypto from 'crypto';

// import axios from 'axios';
import mongoose, { Schema } from 'mongoose';
import db from '../database/connection';
import dotenv from 'dotenv';
import IPost from '../contracts/IPost';
import IUser from '../contracts/IUser';
import PostService from '../services/PostService/PostService';
import UserService from '../services/UserService/UserService';
import PaginationIPost from '../contracts/PaginationIPost';
import { Types } from 'mongoose';

dotenv.config();

function generate(): string {
    return crypto.randomBytes(20).toString('hex');
}

const userData: Omit<IUser, '_id'> = {
    name: 'postTest',
    email: 'postTest@hotmail.com',
    password: 'password',
    posts: new Array<IPost>(),
};

// async function request(
//     url: string,
//     method: string,
//     data: Omit<IPost, 'posts'>
// ) {
//     return axios({ url, method, data });
// }

const userService = new UserService();
const postService = new PostService();

const postData: Omit<IPost, '_id'> = {
    title: generate(),
    description: generate(),
    owner: new Schema.ObjectId(''),
    updatedAt: undefined,
    createdAt: new Date(),
    colorHex: '#ffffff',
};

const postFailData = { ...postData };

beforeAll(async () => {
    await db();
    await userService.createUser(userData);
});

afterAll(async () => {
    await userService.deleteUser(userData.email);
    await mongoose.disconnect();
});

describe('create a Post', () => {
    test('should to create a post', async function () {
        const response: IPost = await postService.createPost(
            postData,
            userData.email
        );

        const responseNecessary = {
            title: response.title,
            description: response.description,
        };

        expect(response).toBeDefined();

        expect(responseNecessary.title).toStrictEqual(postData.title);
        expect(responseNecessary.description).toStrictEqual(
            postData.description
        );

        await postService.deletePost(response._id, userData.email);
    });
});

describe('fail Title create a Post', () => {
    test('should to throw a error create a post', async function () {
        let err;
        try {
            postFailData.title = '';
            await postService.createPost(postFailData, userData.email);
        } catch (e: any) {
            err = e;
        }
        postFailData.title = postData.title;
        expect(err.message).toStrictEqual('title cannot be null');
    });
});

describe('fail Title create a Post Characters more than 100', () => {
    test('should to throw a error create a post', async function () {
        let err;
        try {
            postFailData.title =
                'Exploring the Intricacies of Human Emotion: A Comprehensive Analysis of Love, Fear, Joy, and Their Impact on Our Lives';
            await postService.createPost(postFailData, userData.email);
        } catch (e: any) {
            err = e;
        }
        postFailData.title = postData.title;
        expect(err.message).toStrictEqual(
            'title cannot be more than 100 characters'
        );
    });
});

describe('fail description create a Post', () => {
    test('should to throw a error create a post', async function () {
        let err;
        try {
            postFailData.description = '';
            await postService.createPost(postFailData, userData.email);
        } catch (e: any) {
            err = e;
        }
        postFailData.description = postData.description;
        expect(err.message).toStrictEqual('desc cannot be null');
    });
});

describe('fail description create a Post more than 2500 characters', () => {
    test('should to throw a error create a post', async function () {
        let err;
        try {
            postFailData.description =
                'In a world characterized by rapid change and constant stimuli understanding human emotions has never been more critical This comprehensive analysis delves into the complexities of our emotional landscape examining the core feelings that shape our experiences love fear and joy Each emotion while distinct interweaves to create the rich tapestry of human existence By exploring these emotions in depth we gain insight into not only our personal experiences but also the broader social dynamics that influence our interactions and well beingLove is often hailed as the most profound human emotion serving as the cornerstone of relationships families and communities This analysis begins by dissecting the various forms of love romantic platonic familial and self love highlighting how each type contributes uniquely to our lives We investigate the psychological and biological mechanisms that underpin love from the release of oxytocin during bonding moments to the neural pathways that ignite feelings of attachment and desire Additionally we explore how love can lead to vulnerability and the potential for heartbreak illustrating the duality of love as both a source of immense joy and deep painTransitioning to fear we confront one of humanitys most primal emotions Fear plays a crucial role  survival acting  an early warning system that protects us from danger However in modern society fear can manifest in more complex ways often leading to anxiety and phobias that can hinder our daily lives This section examines the evolutionary basis of fear including the fight or flight response and how it shapes our behavior in the face of perceived threats We also analyze the societal factors that contribute to collective fears such political instability and global crises and how these fears influence group behavior and decision making Understanding fears role in our lives allows us to confront it more effectively transforming it from a paralyzing force into a catalyst for growth and resilienceFinally we delve into joy exploring how this uplifting emotion enhances our lives and fosters connection Joy is not just a fleeting feeling it is a state of being that can be cultivated through mindfulness gratitude and meaningful experiences This section investigates the science of happiness including the role of positive psychology in understanding how joy can be sustained over time We consider the social aspects of joy such as how shared experiences and community engagement amplify feelings of happiness Furthermore we explore the potential for joy to act as a counterbalance to fear and sorrow providing a sense of hope and motivation during challenging timesThroughout this analysis we emphasize the interplay between these emotions Love can mitigate fear providing a sense of safety and belonging while joy often flourishes in environments rich with love and supportive relationships Conversely fear can obstruct our ability to love fully and experience joy creating a cycle that can be difficult to break By understanding these emotional dynamics we can develop strategies to cultivate a more balanced emotional lifeThis exploration is not merely theoretical it includes practical applications for individuals seeking to navigate their emotional landscapes more effectively Through exercises and reflections readers will be encouraged to engage with their emotions fostering a deeper understanding of how love fear and joy manifest in their lives By acknowledging and validating these emotions individuals can enhance their emotional intelligence leading to healthier relationships and greater overall well beingIn summary this comprehensive analysis of love fear and joy offers a nuanced understanding of the emotions that define our human experience By illuminating the complexities of these feelings we empower ourselves to live more authentically and compassionately ultimately leading to a richer more fulfilling life As we journey through the intricacies of human emotion we find that embracing the full spectrum of our feelings is not only a path to personal growth but also a way to foster connection and understanding in an ever evolving world';
            await postService.createPost(postFailData, userData.email);
        } catch (e: any) {
            err = e;
        }
        postFailData.description = postData.description;
        expect(err.message).toStrictEqual(
            'description cannot be more than 2500 characters'
        );
    });
});

describe('get Posts by Title', () => {
    test('should to get post by Title', async function () {
        const post1 = await postService.createPost(postData, userData.email);
        const post2 = await postService.createPost(postData, userData.email);

        const response: IPost[] = await postService.getPostByTitle(
            userData.email,
            postData.title
        );

        expect(response[0].title).toStrictEqual(postData.title);
        expect(response[1].title).toStrictEqual(postData.title);

        await postService.deletePost(post1._id, userData.email);
        await postService.deletePost(post2._id, userData.email);
    });
});

describe('Error get Posts by Title', () => {
    test('should to throw error get post by Title', async function () {
        postFailData.title = 'AnotherOneTitlethatdoesntexist';
        let resp;
        const post1 = await postService.createPost(postData, userData.email);
        const post2 = await postService.createPost(postData, userData.email);
        try {
            resp = await postService.getPostByTitle(
                userData.email,
                postFailData.title
            );
        } catch (e: any) {}
        expect(resp).toStrictEqual([]);

        await postService.deletePost(post1._id, userData.email);
        await postService.deletePost(post2._id, userData.email);
    });
});

describe('get Posts', () => {
    test('should to get all posts', async function () {
        const post1 = await postService.createPost(postData, userData.email);

        const post2 = await postService.createPost(postData, userData.email);

        await postService.createPost(postData, userData.email);

        const response: PaginationIPost = await postService.getAllPosts(
            userData.email,
            1
        );

        expect(response.posts.length).toEqual(3);

        await postService.deletePost(post1._id, userData.email);
        await postService.deletePost(post2._id, userData.email);
    });
});

describe('empty vector get Posts', () => {
    test('should to return empty vector trying get all posts', async function () {
        let response;
        const post1 = await postService.createPost(postData, userData.email);

        const post2 = await postService.createPost(postData, userData.email);

        await postService.createPost(postData, userData.email);

        try {
            response = await postService.getAllPosts(userData.email, 2);
        } catch (e: any) {}

        expect(response?.posts).toStrictEqual([]);

        await postService.deletePost(post1._id, userData.email);
        await postService.deletePost(post2._id, userData.email);
    });
});

describe('delete a post', () => {
    test('should to delete a post', async function () {
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );

        const respDel = await postService.deletePost(
            responseCreate._id,
            userData.email
        );

        expect(respDel).toBeDefined();
        expect(respDel._id).toStrictEqual(responseCreate._id);
    });
});

describe('Error delete a post', () => {
    test('should to throw error delete a post', async function () {
        let err;
        const id = new Types.ObjectId('66ed6b81112c180eec72ef00');

        try {
            await postService.deletePost(id, userData.email);
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('post doesnt exist');
    });
});

describe('update a post', () => {
    test('should to update a post', async function () {
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: 'newTitle',
            updatedAt: undefined,
            description: 'new Description',
            colorHex: '#39ff33',
        };
        const postUpdated = await postService.updatePost(
            newPost,
            responseCreate._id,
            userData.email
        );

        expect(postUpdated).toBeDefined();
        expect(postUpdated.title).toStrictEqual(newPost.title);
        expect(postUpdated.description).toStrictEqual(newPost.description);
        expect(postUpdated.colorHex).toStrictEqual(newPost.colorHex);

        await postService.deletePost(responseCreate._id, userData.email);
    });
});
describe('Error title update a post', () => {
    test('should to throw error update a post', async function () {
        let err;
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: '',
            updatedAt: undefined,
            description: 'new Description',
            colorHex: '#ffffff',
        };
        try {
            await postService.updatePost(
                newPost,
                responseCreate._id,
                userData.email
            );
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('title cannot be null');

        await postService.deletePost(responseCreate._id, userData.email);
    });
});

describe('Error description update a post', () => {
    test('should to throw error update a post', async function () {
        let err;
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: 'title',
            updatedAt: undefined,
            description: '',
            colorHex: '#ffffff',
        };
        try {
            await postService.updatePost(
                newPost,
                responseCreate._id,
                userData.email
            );
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('desc cannot be null');

        await postService.deletePost(responseCreate._id, userData.email);
    });
});

describe('Error colorHex cannot be null update a post', () => {
    test('should to throw error update a post', async function () {
        let err;
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: 'title',
            updatedAt: undefined,
            description: 'asdasdasdasdas',
            colorHex: '',
        };
        try {
            await postService.updatePost(
                newPost,
                responseCreate._id,
                userData.email
            );
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('ColorHex cannot be null');

        await postService.deletePost(responseCreate._id, userData.email);
    });
});

describe('Error colorHex invalid color update a post', () => {
    test('should to throw error update a post', async function () {
        let err;
        const responseCreate = await postService.createPost(
            postData,
            userData.email
        );
        const newPost: Pick<
            IPost,
            'title' | 'updatedAt' | 'description' | 'colorHex'
        > = {
            title: 'title',
            updatedAt: undefined,
            description: 'asdasdasdasdas',
            colorHex: '465',
        };
        try {
            await postService.updatePost(
                newPost,
                responseCreate._id,
                userData.email
            );
        } catch (e: any) {
            err = e;
        }

        expect(err.message).toStrictEqual('color invalid');

        await postService.deletePost(responseCreate._id, userData.email);
    });
});
