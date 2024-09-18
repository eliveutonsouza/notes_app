import { ObjectId } from 'mongoose';

interface IPost {
    _id: ObjectId;
    title: string;
    description: string;
    owner: ObjectId;
    createdAt: Date;
    updatedAt: Date | undefined;
}

export = IPost;
