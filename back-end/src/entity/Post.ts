import { ObjectId } from 'mongoose';
import IPost from '../contracts/IPost';
export class Post implements IPost {
    _id: ObjectId;
    title: string;
    description: string;
    owner: String;
    createdAt: Date;
    updatedAt: Date | undefined;
    constructor(
        _id: ObjectId,
        title: string,
        description: string,
        owner: String,
        createdAt: Date,
        updatedAt: Date | undefined
    ) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.owner = owner;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
