import { ObjectId } from 'mongoose';
import IPost from '../contracts/IPost';
export class Post implements IPost {
    _id: ObjectId;
    title: string;
    description: string;
    owner: ObjectId;
    createdAt: Date;
    updatedAt: Date | undefined;
    colorHex: string;
    constructor(
        _id: ObjectId,
        title: string,
        description: string,
        owner: ObjectId,
        createdAt: Date,
        updatedAt: Date | undefined,
        colorHex: string
    ) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.owner = owner;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.colorHex = colorHex;
    }
}
