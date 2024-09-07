import { Date } from 'mongoose';
import IUser from './User';

interface IPost {
    id: String;
    title: String;
    description: String;
    owner: IUser;
    createdAt: Date;
    updatedAt: Date;
}

export = IPost;
