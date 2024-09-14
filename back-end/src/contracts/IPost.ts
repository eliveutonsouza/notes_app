import { ObjectId } from 'mongoose';

interface IPost {
    _id: ObjectId;
    title: string;
    description: string;
    owner: String;
    createdAt: Date;
    updatedAt: Date | undefined;
}

export = IPost;
