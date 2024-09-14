import { ObjectId } from 'mongoose';
import IPost from '../contracts/IPost';

export class User {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    posts: IPost[];

    constructor(
        _id: ObjectId,
        name: string,
        email: string,
        password: string,
        posts: IPost[]
    ) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.posts = posts;
    }
}
