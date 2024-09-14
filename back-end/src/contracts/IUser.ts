import { ObjectId } from 'mongoose';
import IPost from './IPost';

interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    posts: Array<IPost>;
}

export = IUser;
