import IUser from '../contracts/IUser';
import IPost from '../contracts/IPost';
export class User implements IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    posts: IPost[];

    constructor(
        _id: string,
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
